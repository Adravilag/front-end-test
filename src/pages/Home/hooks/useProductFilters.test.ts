import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useProductFilters, CATEGORIES } from './useProductFilters'

describe('useProductFilters', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('inicia con valores por defecto', () => {
    const { result } = renderHook(() => useProductFilters())
    
    expect(result.current.search).toBe('')
    expect(result.current.category).toBe('all')
    expect(result.current.filteredProducts.length).toBeGreaterThan(0)
  })

  it('filtra productos por búsqueda después del debounce', () => {
    const { result } = renderHook(() => useProductFilters())
    
    act(() => {
      result.current.setSearch('iPhone')
    })

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current.filteredProducts.every(p => 
      p.name.toLowerCase().includes('iphone') || 
      p.brand.toLowerCase().includes('iphone')
    )).toBe(true)
  })

  it('filtra productos por categoría inmediatamente', () => {
    const { result } = renderHook(() => useProductFilters())
    
    act(() => {
      result.current.setCategory('smartphones')
    })

    expect(result.current.filteredProducts.every(p => 
      p.category === 'smartphones'
    )).toBe(true)
  })

  it('combina filtros de búsqueda y categoría', () => {
    const { result } = renderHook(() => useProductFilters())
    
    act(() => {
      result.current.setSearch('Samsung')
      result.current.setCategory('smartphones')
    })

    act(() => {
      vi.advanceTimersByTime(300)
    })

    const filtered = result.current.filteredProducts
    expect(filtered.every(p => 
      p.category === 'smartphones' &&
      (p.name.toLowerCase().includes('samsung') || p.brand.toLowerCase().includes('samsung'))
    )).toBe(true)
  })

  it('devuelve array vacío cuando no hay coincidencias', () => {
    const { result } = renderHook(() => useProductFilters())
    
    act(() => {
      result.current.setSearch('producto-inexistente-xyz')
    })

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current.filteredProducts).toHaveLength(0)
  })

  it('CATEGORIES contiene todas las categorías esperadas', () => {
    const values = CATEGORIES.map(c => c.value)
    expect(values).toContain('all')
    expect(values).toContain('smartphones')
    expect(values).toContain('tablets')
    expect(values).toContain('accesorios')
  })
})
