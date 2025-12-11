import { useMemo, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { type Product } from '../../../data'
import { getProductById, getProducts, addToCart } from '../../../services/api'
import { useCart } from '../../../context/CartContext'

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
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  
  const [selectedColor, setSelectedColor] = useState<number | undefined>(undefined)
  const [selectedStorage, setSelectedStorage] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (id) {
      setLoading(true)
      getProductById(id).then(p => {
        setProduct(p)
        setLoading(false)
        // Reset selections
        setSelectedColor(undefined)
        setSelectedStorage(undefined)
        
        // Auto-select the first available option
        if (p?.options?.colors && p.options.colors.length > 0) {
          setSelectedColor(p.options.colors[0].code)
        }
        if (p?.options?.storages && p.options.storages.length > 0) {
          setSelectedStorage(p.options.storages[0].code)
        }
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

  const handleAddToCart = async () => {
    if (!product || !selectedColor || !selectedStorage) return
    
    const colorOption = product.options?.colors?.find(c => c.code === selectedColor)
    const storageOption = product.options?.storages?.find(s => s.code === selectedStorage)
    
    // Guardar el item localmente para poder mostrarlo (siempre)
    addItem({
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      productPrice: product.price,
      colorCode: selectedColor,
      colorName: colorOption?.name || 'N/A',
      storageCode: selectedStorage,
      storageName: storageOption?.name || 'N/A',
      addedAt: Date.now()
    })
    
    try {
      // Llamamos al API (requerido por el test)
      await addToCart({
        id: product.id,
        colorCode: selectedColor,
        storageCode: selectedStorage
      })
    } catch (error) {
      console.error('Failed to add to cart', error)
    }
  }

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
    selectedColor,
    setSelectedColor,
    selectedStorage,
    setSelectedStorage,
    handleAddToCart
  }
}

