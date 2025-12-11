import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react'
import type { BreadcrumbItem } from '../ui'

interface BreadcrumbContextType {
  items: BreadcrumbItem[]
  setItems: (items: BreadcrumbItem[]) => void
  clearItems: () => void
}

const BreadcrumbContext = createContext<BreadcrumbContextType | null>(null)

interface BreadcrumbProviderProps {
  readonly children: ReactNode
}

export function BreadcrumbProvider({ children }: BreadcrumbProviderProps) {
  const [items, setItemsState] = useState<BreadcrumbItem[]>([])

  const setItems = useCallback((newItems: BreadcrumbItem[]) => {
    setItemsState(newItems)
  }, [])

  const clearItems = useCallback(() => {
    setItemsState([])
  }, [])

  const value = useMemo(() => ({ items, setItems, clearItems }), [items, setItems, clearItems])

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

export function useBreadcrumbContext() {
  const context = useContext(BreadcrumbContext)
  if (!context) {
    throw new Error('useBreadcrumbContext must be used within a BreadcrumbProvider')
  }
  return context
}
