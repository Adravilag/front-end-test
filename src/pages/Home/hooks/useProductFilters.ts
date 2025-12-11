import { useState } from 'react'
import { products, type Product } from '../../../data'
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

const filterProducts = (search: string, category: CategoryFilter) =>
  products.filter(p =>
    matchesSearch(p, search.toLowerCase()) &&
    (category === 'all' || p.category === category)
  )

export function useProductFilters() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<CategoryFilter>('all')
  const debouncedSearch = useDebounce(search, 300)

  return {
    search,
    category,
    filteredProducts: filterProducts(debouncedSearch, category),
    setSearch,
    setCategory,
  }
}
