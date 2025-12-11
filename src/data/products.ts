export interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  category: 'smartphones' | 'tablets' | 'accesorios'
  stock: 'in-stock' | 'low-stock' | 'out-of-stock'
  isNew?: boolean
  isFeatured?: boolean
  specs: {
    screen?: string
    processor?: string
    ram?: string
    storage?: string
    battery?: string
    camera?: string
  }
  description: string
  options?: {
    colors: { code: number; name: string }[]
    storages: { code: number; name: string }[]
  }
}

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    price: 1299,
    originalPrice: 1499,
    image: 'https://picsum.photos/seed/iphone15/400/400',
    images: [
      'https://picsum.photos/seed/iphone15/600/600',
      'https://picsum.photos/seed/iphone15-2/600/600',
      'https://picsum.photos/seed/iphone15-3/600/600',
    ],
    category: 'smartphones',
    stock: 'in-stock',
    isNew: true,
    isFeatured: true,
    specs: {
      screen: '6.7" Super Retina XDR',
      processor: 'A17 Pro',
      ram: '8GB',
      storage: '256GB',
      battery: '4422 mAh',
      camera: '48MP + 12MP + 12MP',
    },
    description: 'El iPhone más avanzado con chip A17 Pro, sistema de cámara pro y diseño de titanio.',
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 1199,
    image: 'https://picsum.photos/seed/galaxy24/400/400',
    images: [
      'https://picsum.photos/seed/galaxy24/600/600',
      'https://picsum.photos/seed/galaxy24-2/600/600',
      'https://picsum.photos/seed/galaxy24-3/600/600',
    ],
    category: 'smartphones',
    stock: 'in-stock',
    isFeatured: true,
    specs: {
      screen: '6.8" Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB',
      battery: '5000 mAh',
      camera: '200MP + 12MP + 50MP + 10MP',
    },
    description: 'Potencia y productividad con Galaxy AI integrado y S Pen incluido.',
  },
  {
    id: '3',
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    price: 999,
    originalPrice: 1099,
    image: 'https://picsum.photos/seed/pixel8/400/400',
    images: [
      'https://picsum.photos/seed/pixel8/600/600',
      'https://picsum.photos/seed/pixel8-2/600/600',
      'https://picsum.photos/seed/pixel8-3/600/600',
    ],
    category: 'smartphones',
    stock: 'low-stock',
    isNew: true,
    specs: {
      screen: '6.7" LTPO OLED',
      processor: 'Tensor G3',
      ram: '12GB',
      storage: '128GB',
      battery: '5050 mAh',
      camera: '50MP + 48MP + 48MP',
    },
    description: 'La mejor experiencia Android con IA de Google y 7 años de actualizaciones.',
  },
  {
    id: '4',
    name: 'Xiaomi 14 Ultra',
    brand: 'Xiaomi',
    price: 899,
    image: 'https://picsum.photos/seed/xiaomi14/400/400',
    images: [
      'https://picsum.photos/seed/xiaomi14/600/600',
      'https://picsum.photos/seed/xiaomi14-2/600/600',
      'https://picsum.photos/seed/xiaomi14-3/600/600',
    ],
    category: 'smartphones',
    stock: 'in-stock',
    specs: {
      screen: '6.73" AMOLED LTPO',
      processor: 'Snapdragon 8 Gen 3',
      ram: '16GB',
      storage: '512GB',
      battery: '5000 mAh',
      camera: '50MP Leica x4',
    },
    description: 'Fotografía profesional con ópticas Leica y rendimiento extremo.',
  },
  {
    id: '5',
    name: 'iPad Pro 12.9"',
    brand: 'Apple',
    price: 1099,
    image: 'https://picsum.photos/seed/ipadpro/400/400',
    images: [
      'https://picsum.photos/seed/ipadpro/600/600',
      'https://picsum.photos/seed/ipadpro-2/600/600',
      'https://picsum.photos/seed/ipadpro-3/600/600',
    ],
    category: 'tablets',
    stock: 'in-stock',
    isFeatured: true,
    specs: {
      screen: '12.9" Liquid Retina XDR',
      processor: 'M2',
      ram: '8GB',
      storage: '256GB',
      battery: '10 horas',
    },
    description: 'La tablet más potente con chip M2 y pantalla Liquid Retina XDR.',
  },
  {
    id: '6',
    name: 'Samsung Galaxy Tab S9 Ultra',
    brand: 'Samsung',
    price: 999,
    originalPrice: 1199,
    image: 'https://picsum.photos/seed/tabs9/400/400',
    images: [
      'https://picsum.photos/seed/tabs9/600/600',
      'https://picsum.photos/seed/tabs9-2/600/600',
      'https://picsum.photos/seed/tabs9-3/600/600',
    ],
    category: 'tablets',
    stock: 'low-stock',
    specs: {
      screen: '14.6" Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 2',
      ram: '12GB',
      storage: '256GB',
      battery: '11200 mAh',
    },
    description: 'Pantalla inmersiva y productividad sin límites con S Pen incluido.',
  },
  {
    id: '7',
    name: 'AirPods Pro 2',
    brand: 'Apple',
    price: 249,
    image: 'https://picsum.photos/seed/airpods/400/400',
    images: [
      'https://picsum.photos/seed/airpods/600/600',
      'https://picsum.photos/seed/airpods-2/600/600',
    ],
    category: 'accesorios',
    stock: 'in-stock',
    isNew: true,
    specs: {
      battery: '6 horas (30h con estuche)',
    },
    description: 'Audio espacial personalizado y cancelación activa de ruido.',
  },
  {
    id: '8',
    name: 'Cargador MagSafe 15W',
    brand: 'Apple',
    price: 49,
    image: 'https://picsum.photos/seed/magsafe/400/400',
    images: [
      'https://picsum.photos/seed/magsafe/600/600',
    ],
    category: 'accesorios',
    stock: 'out-of-stock',
    specs: {},
    description: 'Carga inalámbrica rápida con alineación magnética perfecta.',
  },
]

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id)
}

export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter(product => product.category === category)
}

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured)
}
