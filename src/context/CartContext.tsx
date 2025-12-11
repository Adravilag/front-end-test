import { createContext, useContext, useState, ReactNode } from 'react'

interface CartContextType {
  count: number
  addToCartCount: (quantity: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0)

  const addToCartCount = (quantity: number) => {
    setCount(prev => prev + quantity)
  }

  return (
    <CartContext.Provider value={{ count, addToCartCount }}>
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
