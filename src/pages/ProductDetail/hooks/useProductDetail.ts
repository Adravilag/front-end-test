import { useMemo, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { type Product } from '../../../data'
import { getProductById, getProducts } from '../../../services/api'

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
  const [product, setProduct] = useState<Product | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  useEffect(() => {
    if (id) {
      setLoading(true)
      getProductById(id).then(p => {
        setProduct(p)
        setLoading(false)
      })
    }
  }, [id])

  useEffect(() => {
    if (product) {
      getProducts().then(allProducts => {
        setRelatedProducts(
          allProducts
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4)
        )
      })
    }
  }, [product])

  const discount = useMemo(
    () => product ? calculateDiscount(product.price, product.originalPrice) : null,
    [product]
  )

  const stockInfo = product ? STOCK_CONFIG[product.stock] : null

  const specs = useMemo(
    () => product ? Object.entries(product.specs).filter(([, value]) => value) : [],
    [product]
  )

  const goHome = () => navigate('/')

  return {
    product,
    loading,
    discount,
    stockInfo,
    relatedProducts,
    specs,
    goHome,
  }
}
