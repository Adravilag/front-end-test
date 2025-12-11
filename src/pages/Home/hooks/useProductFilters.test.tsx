import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ReactNode } from 'react'
import { useProductFilters, CATEGORIES } from './useProductFilters'
import * as api from '../../../services/api'

// Mock del servicio API
vi.mock('../../../services/api', () => ({
  getProducts: vi.fn()
}))

const mockProducts = [
  { 
    id: '1', 
    name: 'iPhone 15', 
    brand: 'Apple', 
    category: 'smartphones', 
    price: 1000, 
    image: '', 
    images: [], 
    stock: 'in-stock', 
    specs: {}, 
    description: '' 
  },
  { 
    id: '2', 
    name: 'iPad Pro', 
    brand: 'Apple', 
    category: 'tablets', 
    price: 800, 
    image: '', 
    images: [], 
    stock: 'in-stock', 
    specs: {}, 
    description: '' 
  },
]

// Wrapper con Router para los tests
const wrapper = ({ children }: { children: ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
)

describe('useProductFilters', () => {
  beforeEach(() => {
    vi.mocked(api.getProducts).mockResolvedValue(mockProducts as any)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  // Eliminamos fake timers globales para evitar conflictos con waitFor

  it('inicia con valores por defecto', async () => {
    const { result } = renderHook(() => useProductFilters(), { wrapper })
    
    expect(result.current.loading).toBe(true)
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.search).toBe('')
    expect(result.current.category).toBe('all')
    expect(result.current.filteredProducts.length).toBe(2)
  })

  it('filtra productos por búsqueda después del debounce', async () => {
    const { result } = renderHook(() => useProductFilters(), { wrapper })
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    act(() => {
      result.current.setSearch('iPhone')
    })

    // Esperar el tiempo del debounce (300ms) + un margen
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 350))
    })

    expect(result.current.filteredProducts.length).toBe(1)
    expect(result.current.filteredProducts[0].name).toBe('iPhone 15')
  })

  it('filtra productos por categoría inmediatamente', async () => {
    const { result } = renderHook(() => useProductFilters(), { wrapper })
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    act(() => {
      result.current.setCategory('smartphones')
    })

    expect(result.current.filteredProducts.length).toBe(1)
    expect(result.current.filteredProducts[0].category).toBe('smartphones')
  })

  it('combina filtros de búsqueda y categoría', async () => {
    const { result } = renderHook(() => useProductFilters(), { wrapper })
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    act(() => {
      result.current.setSearch('iPad')
      result.current.setCategory('smartphones')
    })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 350))
    })

    expect(result.current.filteredProducts.length).toBe(0)
  })

  it('devuelve array vacío cuando no hay coincidencias', async () => {
    const { result } = renderHook(() => useProductFilters(), { wrapper })
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    act(() => {
      result.current.setSearch('xyz')
    })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 350))
    })

    expect(result.current.filteredProducts.length).toBe(0)
  })

  it('CATEGORIES contiene todas las categorías esperadas', () => {
    const values = CATEGORIES.map(c => c.value)
    expect(values).toContain('all')
    expect(values).toContain('smartphones')
    expect(values).toContain('tablets')
    expect(values).toContain('accesorios')
  })
})
