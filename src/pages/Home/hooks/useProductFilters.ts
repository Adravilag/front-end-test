import { useState, useEffect } from 'react'
import { type Product } from '../../../data'
import { getProducts } from '../../../services/api'
import { useDebounce } from '../../../hooks'

export type CategoryFilter = 'all' | Product['category']

export const CATEGORIES = [
  { value: 'all' as const, label: 'Todos' },
  { value: 'smartphones' as const, label: 'Smartphones' },
  { value: 'tablets' as const, label: 'Tablets' },
  { value: 'accesorios' as const, label: 'Accesorios' },
]

const matchesSearch = (product: Product, term: string) =>
  product.name.toLowerCase().includes(term) ||
  product.brand.toLowerCase().includes(term)

export function useProductFilters() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<CategoryFilter>('all')
  const debouncedSearch = useDebounce(search, 300)

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  const filteredProducts = products.filter(p =>
    matchesSearch(p, debouncedSearch.toLowerCase()) &&
    (category === 'all' || p.category === category)
  )

  return {
    search,
    category,
    filteredProducts,
    setSearch,
    setCategory,
    loading,
  }
}
