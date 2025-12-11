import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

const CART_STORAGE_KEY = 'cart_count'
const CART_ITEMS_KEY = 'cart_items'

export interface CartItem {
  productId: string
  productName: string
  productImage: string
  productPrice: number
  colorCode: number
  colorName: string
  storageCode: number
  storageName: string
  addedAt: number
}

interface CartContextType {
  count: number
  items: CartItem[]
  notification: string | null
  setCartCount: (count: number) => void
  addItem: (item: CartItem) => void
  removeItem: (index: number) => void
  clearCart: () => void
  dismissNotification: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Leer el count inicial desde localStorage
const getInitialCount = (): number => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    return stored ? parseInt(stored, 10) : 0
  } catch {
    return 0
  }
}

// Leer los items iniciales desde localStorage
const getInitialItems = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_ITEMS_KEY)
    if (!stored) return []
    
    const items: CartItem[] = JSON.parse(stored)
    const oneHourAgo = Date.now() - (60 * 60 * 1000)
    
    // Filtrar items que tengan menos de 1 hora
    return items.filter(item => item.addedAt > oneHourAgo)
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(getInitialCount)
  const [items, setItems] = useState<CartItem[]>(getInitialItems)
  const [notification, setNotification] = useState<string | null>(null)

  // Persistir el count en localStorage cuando cambie
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, String(count))
    } catch (error) {
      console.warn('Error saving cart count:', error)
    }
  }, [count])

  // Persistir los items en localStorage cuando cambien
  useEffect(() => {
    try {
      localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(items))
    } catch (error) {
      console.warn('Error saving cart items:', error)
    }
  }, [items])

  const setCartCount = (newCount: number) => {
    // Si el servidor devuelve un count menor al esperado, la sesión reinició
    // Limpiamos los items locales porque ya no son válidos
    if (newCount < items.length) {
      console.info('Sesión del carrito reiniciada en el servidor')
      setItems([])
      setNotification('El carrito ha sido reiniciado porque la sesión expiró en el servidor')
    }
    setCount(newCount)
  }

  const dismissNotification = () => {
    setNotification(null)
  }

  const addItem = (item: CartItem) => {
    setItems(prev => [...prev, item])
  }

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index))
    setCount(prev => Math.max(0, prev - 1))
  }

  const clearCart = () => {
    setCount(0)
    setItems([])
  }

  return (
    <CartContext.Provider value={{ 
      count, 
      items, 
      notification,
      setCartCount, 
      addItem, 
      removeItem, 
      clearCart,
      dismissNotification 
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
