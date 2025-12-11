import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useProductDetail } from './useProductDetail'
import * as api from '../../../services/api'
import { CartProvider } from '../../../context/CartContext'

// Mock del servicio API
vi.mock('../../../services/api', () => ({
  getProductById: vi.fn(),
  getProducts: vi.fn(),
  addToCart: vi.fn()
}))

const mockProduct = {
  id: '1',
  name: 'iPhone 15',
  brand: 'Apple',
  category: 'smartphones',
  price: 1000,
  originalPrice: 1200,
  image: '',
  images: [],
  stock: 'in-stock',
  specs: { screen: '6.1' },
  description: '',
  options: {
    colors: [{ code: 1, name: 'Black' }],
    storages: [{ code: 1, name: '128GB' }]
  }
}

const mockProducts = [
  mockProduct,
  { 
    id: '2', 
    name: 'Other Phone', 
    brand: 'Apple',
    category: 'smartphones', 
    price: 900, 
    image: '',
    images: [],
    stock: 'in-stock', 
    specs: {},
    description: ''
  }
]

const createWrapper = (productId: string) => {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <CartProvider>
        <MemoryRouter initialEntries={[`/product/${productId}`]}>
          <Routes>
            <Route path="/product/:id" element={children} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    )
  }
}


describe('useProductDetail', () => {
  beforeEach(() => {
    vi.mocked(api.getProductById).mockResolvedValue(mockProduct as any)
    vi.mocked(api.getProducts).mockResolvedValue(mockProducts as any)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('devuelve producto existente correctamente', async () => {
    const { result } = renderHook(() => useProductDetail(), {
      wrapper: createWrapper('1'),
    })

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.product).toBeDefined()
    expect(result.current.product?.id).toBe('1')
  })

  it('devuelve null para producto inexistente', async () => {
    vi.mocked(api.getProductById).mockResolvedValue(undefined)

    const { result } = renderHook(() => useProductDetail(), {
      wrapper: createWrapper('invalid-id'),
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.product).toBeUndefined()
  })

  it('calcula descuento correctamente', async () => {
    const { result } = renderHook(() => useProductDetail(), {
      wrapper: createWrapper('1'),
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.discount?.hasDiscount).toBe(true)
    expect(result.current.discount?.percent).toBeGreaterThan(0)
    expect(result.current.discount?.savings).toBeGreaterThan(0)
  })

  it('obtiene información de stock', async () => {
    const { result } = renderHook(() => useProductDetail(), {
      wrapper: createWrapper('1'),
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.stockInfo).toBeDefined()
    expect(result.current.stockInfo?.label).toBeDefined()
    expect(result.current.stockInfo?.variant).toBeDefined()
  })

  it('obtiene productos relacionados de la misma categoría', async () => {
    const { result } = renderHook(() => useProductDetail(), {
      wrapper: createWrapper('1'),
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Esperar a que se carguen los productos relacionados
    await waitFor(() => {
      expect(result.current.relatedProducts.length).toBeGreaterThan(0)
    })

    result.current.relatedProducts.forEach(p => {
      expect(p.category).toBe(mockProduct.category)
      expect(p.id).not.toBe(mockProduct.id)
    })
  })

  it('limita productos relacionados a 4', async () => {
    const manyProducts = Array(10).fill(null).map((_, i) => ({
      ...mockProduct,
      id: `rel-${i}`,
      name: `Related ${i}`
    }))
    vi.mocked(api.getProducts).mockResolvedValue(manyProducts as any)

    const { result } = renderHook(() => useProductDetail(), {
      wrapper: createWrapper('1'),
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    await waitFor(() => {
      expect(result.current.relatedProducts.length).toBeLessThanOrEqual(4)
    })
  })

  it('filtra specs vacías', async () => {
    const { result } = renderHook(() => useProductDetail(), {
      wrapper: createWrapper('1'),
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    result.current.specs.forEach(([, value]) => {
      expect(value).toBeTruthy()
    })
  })
})
