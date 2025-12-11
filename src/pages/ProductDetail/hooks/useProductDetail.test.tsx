import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useProductDetail } from './useProductDetail'
import { products } from '../../../data'

const createWrapper = (productId: string) => {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter initialEntries={[`/product/${productId}`]}>
        <Routes>
          <Route path="/product/:id" element={children} />
        </Routes>
      </MemoryRouter>
    )
  }
}

describe('useProductDetail', () => {
  it('devuelve producto existente correctamente', () => {
    const testProduct = products[0]
    const { result } = renderHook(() => useProductDetail(), {
      wrapper: createWrapper(testProduct.id),
    })

    expect(result.current.product).toBeDefined()
    expect(result.current.product?.id).toBe(testProduct.id)
  })

  it('devuelve null para producto inexistente', () => {
    const { result } = renderHook(() => useProductDetail(), {
      wrapper: createWrapper('invalid-id'),
    })

    expect(result.current.product).toBeUndefined()
  })

  it('calcula descuento correctamente', () => {
    const productWithDiscount = products.find(p => p.originalPrice && p.originalPrice > p.price)
    if (!productWithDiscount) return

    const { result } = renderHook(() => useProductDetail(), {
      wrapper: createWrapper(productWithDiscount.id),
    })

    expect(result.current.discount?.hasDiscount).toBe(true)
    expect(result.current.discount?.percent).toBeGreaterThan(0)
    expect(result.current.discount?.savings).toBeGreaterThan(0)
  })

  it('obtiene información de stock', () => {
    const testProduct = products[0]
    const { result } = renderHook(() => useProductDetail(), {
      wrapper: createWrapper(testProduct.id),
    })

    expect(result.current.stockInfo).toBeDefined()
    expect(result.current.stockInfo?.label).toBeDefined()
    expect(result.current.stockInfo?.variant).toBeDefined()
  })

  it('obtiene productos relacionados de la misma categoría', () => {
    const testProduct = products[0]
    const { result } = renderHook(() => useProductDetail(), {
      wrapper: createWrapper(testProduct.id),
    })

    result.current.relatedProducts.forEach(p => {
      expect(p.category).toBe(testProduct.category)
      expect(p.id).not.toBe(testProduct.id)
    })
  })

  it('limita productos relacionados a 4', () => {
    const testProduct = products[0]
    const { result } = renderHook(() => useProductDetail(), {
      wrapper: createWrapper(testProduct.id),
    })

    expect(result.current.relatedProducts.length).toBeLessThanOrEqual(4)
  })

  it('filtra specs vacías', () => {
    const testProduct = products[0]
    const { result } = renderHook(() => useProductDetail(), {
      wrapper: createWrapper(testProduct.id),
    })

    result.current.specs.forEach(([, value]) => {
      expect(value).toBeTruthy()
    })
  })
})
