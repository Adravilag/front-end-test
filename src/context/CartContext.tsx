import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react'

const CART_ITEMS_KEY = 'api_cache_cart_items'
const CART_LAST_UPDATE_KEY = 'api_cache_cart_last_update'

const CART_EXPIRATION_MS = 60 * 60 * 1000 // 1 hora

export interface CartItem {
  productId: string
  productName: string
  productImage: string
  productPrice: number
  colorCode: number
  colorName: string
  storageCode: number
  storageName: string
  quantity: number
  addedAt: number
}

// Genera una clave única para identificar un producto con sus opciones
const getItemKey = (item: Pick<CartItem, 'productId' | 'colorCode' | 'storageCode'>) => 
  `${item.productId}-${item.colorCode}-${item.storageCode}`

interface CartContextType {
  count: number
  items: CartItem[]
  expiredCount: number
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (index: number) => void
  updateQuantity: (index: number, quantity: number) => void
  clearCart: () => void
  clearExpiredNotification: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Leer los items iniciales desde localStorage (se ejecuta una vez al cargar el módulo)
const getInitialData = (): { items: CartItem[], expiredCount: number } => {
  try {
    const stored = localStorage.getItem(CART_ITEMS_KEY)
    const lastUpdate = localStorage.getItem(CART_LAST_UPDATE_KEY)
    
    if (!stored) return { items: [], expiredCount: 0 }
    
    const allItems: CartItem[] = JSON.parse(stored)
    if (allItems.length === 0) return { items: [], expiredCount: 0 }
    
    // Verificar si el carrito ha expirado basándose en la última actualización
    const lastUpdateTime = lastUpdate ? parseInt(lastUpdate, 10) : 0
    const hasExpired = Date.now() - lastUpdateTime > CART_EXPIRATION_MS
    
    if (hasExpired) {
      // Limpiar localStorage
      localStorage.removeItem(CART_ITEMS_KEY)
      localStorage.removeItem(CART_LAST_UPDATE_KEY)
      return { items: [], expiredCount: allItems.length }
    }
    
    return { items: allItems, expiredCount: 0 }
  } catch {
    return { items: [], expiredCount: 0 }
  }
}

// Calcular los datos iniciales una sola vez cuando se carga el módulo
const initialData = getInitialData()

export function CartProvider({ children }: { children: ReactNode }) {
  const hasInitialized = useRef(false)
  const [items, setItems] = useState<CartItem[]>(initialData.items)
  const [expiredCount, setExpiredCount] = useState(0)
  const [lastUpdate, setLastUpdate] = useState<number>(() => {
    const stored = localStorage.getItem(CART_LAST_UPDATE_KEY)
    return stored ? parseInt(stored, 10) : Date.now()
  })

  // Mostrar notificación de expirados solo una vez al montar
  useEffect(() => {
    if (!hasInitialized.current && initialData.expiredCount > 0) {
      hasInitialized.current = true
      setExpiredCount(initialData.expiredCount)
    }
  }, [])

  // Verificar expiración del carrito completo basándose en lastUpdate
  useEffect(() => {
    if (items.length === 0) return

    const timeUntilExpiration = CART_EXPIRATION_MS - (Date.now() - lastUpdate)
    
    if (timeUntilExpiration <= 0) {
      // Ya expiró
      setExpiredCount(items.length)
      setItems([])
      return
    }

    // Programar la expiración exacta
    const timeoutId = setTimeout(() => {
      setItems(currentItems => {
        if (currentItems.length > 0) {
          setExpiredCount(currentItems.length)
          return []
        }
        return currentItems
      })
    }, timeUntilExpiration)

    return () => clearTimeout(timeoutId)
  }, [items.length, lastUpdate])

  // Persistir los items en localStorage cuando cambien
  useEffect(() => {
    try {
      if (items.length > 0) {
        localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(items))
        localStorage.setItem(CART_LAST_UPDATE_KEY, lastUpdate.toString())
      } else {
        localStorage.removeItem(CART_ITEMS_KEY)
        localStorage.removeItem(CART_LAST_UPDATE_KEY)
      }
    } catch (error) {
      console.warn('Error saving cart items:', error)
    }
  }, [items, lastUpdate])

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    const now = Date.now()
    setLastUpdate(now)
    
    setItems(prev => {
      const itemKey = getItemKey(item)
      const existingIndex = prev.findIndex(i => getItemKey(i) === itemKey)
      
      if (existingIndex >= 0) {
        // Si ya existe, incrementar cantidad
        const newItems = [...prev]
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + 1,
          addedAt: now
        }
        return newItems
      }
      
      // Si no existe, añadir nuevo con cantidad 1
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeItem = (index: number) => {
    setItems(prev => {
      const newItems = prev.filter((_, i) => i !== index)
      if (newItems.length === 0) {
        setLastUpdate(Date.now())
      }
      return newItems
    })
  }

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity < 1) {
      removeItem(index)
      return
    }
    
    setLastUpdate(Date.now())
    setItems(prev => {
      const newItems = [...prev]
      newItems[index] = { ...newItems[index], quantity }
      return newItems
    })
  }

  const clearCart = () => {
    setItems([])
    setLastUpdate(Date.now())
  }

  const clearExpiredNotification = () => {
    setExpiredCount(0)
  }

  // Contar total de unidades (suma de todas las cantidades)
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ 
      count: totalCount,
      items,
      expiredCount,
      addItem, 
      removeItem,
      updateQuantity,
      clearCart,
      clearExpiredNotification
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
