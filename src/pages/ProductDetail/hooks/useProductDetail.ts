import { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById, products, type Product } from '../../../data'

interface StockConfig {
  label: string
  variant: 'success' | 'warning' | 'error'
}

const STOCK_CONFIG: Record<Product['stock'], StockConfig> = {
  'in-stock': { label: 'Disponible', variant: 'success' },
  'low-stock': { label: 'Últimas unidades', variant: 'warning' },
  'out-of-stock': { label: 'Agotado', variant: 'error' },
}

const calculateDiscount = (price: number, originalPrice?: number) => {
  if (!originalPrice || originalPrice <= price) return { hasDiscount: false, percent: 0, savings: 0 }
  return {
    hasDiscount: true,
    percent: Math.round((1 - price / originalPrice) * 100),
    savings: originalPrice - price,
  }
}

export function useProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const product = id ? getProductById(id) : undefined

  const discount = useMemo(
    () => product ? calculateDiscount(product.price, product.originalPrice) : null,
    [product]
  )

  const stockInfo = product ? STOCK_CONFIG[product.stock] : null

  const relatedProducts = useMemo(
    () => product
      ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
      : [],
    [product]
  )

  const specs = useMemo(
    () => product ? Object.entries(product.specs).filter(([, value]) => value) : [],
    [product]
  )

  const goHome = () => navigate('/')

  return {
    product,
    discount,
    stockInfo,
    relatedProducts,
    specs,
    goHome,
  }
}
