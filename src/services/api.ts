import { Product } from '../data/products'

const API_URL = 'https://itx-frontend-test.onrender.com/api'

export interface ApiProduct {
  id: string
  brand: string
  model: string
  price: string
  imgUrl: string
  networkTechnology?: string
  networkSpeed?: string
  gprs?: string
  edge?: string
  announced?: string
  status?: string
  dimentions?: string
  weight?: string
  sim?: string
  displayType?: string
  displayResolution?: string
  displaySize?: string
  os?: string
  cpu?: string
  chipset?: string
  gpu?: string
  externalMemory?: string
  internalMemory?: string[]
  ram?: string
  primaryCamera?: string
  secondaryCmera?: string
  speaker?: string
  audioJack?: string
  wlan?: string[]
  bluetooth?: string[]
  gps?: string
  nfc?: string
  radio?: string
  usb?: string
  sensors?: string
  battery?: string
  colors?: string[]
  options?: {
    colors?: { code: number; name: string }[]
    storages?: { code: number; name: string }[]
  }
}

export const mapApiProductToProduct = (apiProduct: ApiProduct): Product => {
  // Simple heuristic for category
  const isTablet = apiProduct.model.toLowerCase().includes('tab') || 
                   apiProduct.model.toLowerCase().includes('ipad')
  
  return {
    id: apiProduct.id,
    name: apiProduct.model,
    brand: apiProduct.brand,
    price: parseFloat(apiProduct.price) || 0,
    originalPrice: undefined,
    image: apiProduct.imgUrl,
    images: [apiProduct.imgUrl],
    category: isTablet ? 'tablets' : 'smartphones',
    stock: 'in-stock',
    isNew: false,
    isFeatured: false,
    specs: {
      screen: [apiProduct.displayResolution, apiProduct.displaySize].filter(Boolean).join(' - '),
      processor: [apiProduct.cpu, apiProduct.chipset].filter(Boolean).join(' - '),
      ram: apiProduct.ram,
      storage: apiProduct.internalMemory ? apiProduct.internalMemory.join(', ') : undefined,
      battery: apiProduct.battery,
      camera: [apiProduct.primaryCamera, apiProduct.secondaryCmera].filter(Boolean).join(' / ')
    },
    description: `Brand: ${apiProduct.brand}, Model: ${apiProduct.model}, OS: ${apiProduct.os || 'N/A'}`,
    options: {
      colors: apiProduct.options?.colors || [],
      storages: apiProduct.options?.storages || []
    }
  }
}

export const addToCart = async (item: { id: string; colorCode: number; storageCode: number }): Promise<{ count: number }> => {
  try {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })

    if (!response.ok) {
      throw new Error('Failed to add to cart')
    }

    const data = await response.json()
    // Handle array response as per API spec
    if (Array.isArray(data) && data.length > 0) {
      return data[0]
    }
    return data
  } catch (error) {
    console.error('Error adding to cart:', error)
    throw error
  }
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/product`)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    const data: ApiProduct[] = await response.json()
    return data.map(mapApiProductToProduct)
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export const getProductById = async (id: string): Promise<Product | undefined> => {
  try {
    const response = await fetch(`${API_URL}/product/${id}`)
    if (!response.ok) {
      return undefined
    }
    const data: ApiProduct = await response.json()
    return mapApiProductToProduct(data)
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error)
    return undefined
  }
}
