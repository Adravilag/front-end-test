import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
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

const isValidCategory = (value: string | null): value is CategoryFilter =>
  value !== null && CATEGORIES.some(c => c.value === value)

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  
  // Leer categoría desde query params
  const categoryParam = searchParams.get('category')
  const category: CategoryFilter = isValidCategory(categoryParam) ? categoryParam : 'all'
  
  const debouncedSearch = useDebounce(search, 300)

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  // Actualizar query params cuando cambia la categoría
  const setCategory = useCallback((newCategory: CategoryFilter) => {
    if (newCategory === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', newCategory)
    }
    setSearchParams(searchParams)
  }, [searchParams, setSearchParams])

  const filteredProducts = products.filter(p =>
    matchesSearch(p, debouncedSearch.toLowerCase()) &&
    (category === 'all' || p.category === category)
  )

  // Obtener el label de la categoría actual
  const categoryLabel = CATEGORIES.find(c => c.value === category)?.label ?? 'Todos'

  return {
    search,
    category,
    categoryLabel,
    filteredProducts,
    setSearch,
    setCategory,
    loading,
  }
}
