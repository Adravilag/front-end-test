import type { Meta, StoryObj } from '@storybook/react'
import { PaginatedGrid } from './PaginatedList'
import { Card, Image, Button, Icon } from '../'

interface Product {
  id: string
  name: string
  brand: string
  price: number
  image: string
  stock: 'in-stock' | 'low-stock' | 'out-of-stock'
}

const generateMockProducts = (count: number): Product[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `product-${i + 1}`,
    name: `Smartphone Model ${i + 1}`,
    brand: ['Apple', 'Samsung', 'Xiaomi', 'Google', 'OnePlus'][i % 5],
    price: Math.floor(Math.random() * 800) + 200,
    image: `https://picsum.photos/seed/${i + 100}/400/400`,
    stock: ['in-stock', 'low-stock', 'out-of-stock'][i % 3] as Product['stock'],
  }))

const mockProducts = generateMockProducts(100)

const stockLabel = {
  'in-stock': 'Disponible',
  'low-stock': 'Últimas unidades',
  'out-of-stock': 'Agotado',
}

const stockColor = {
  'in-stock': '#16a34a',
  'low-stock': '#ca8a04',
  'out-of-stock': '#dc2626',
}

const ProductCard = ({ product }: { product: Product }) => (
  <Card variant="elevated" style={{ height: '100%' }}>
    <div style={{ aspectRatio: '1', overflow: 'hidden', borderRadius: '8px 8px 0 0' }}>
      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={400}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
    <div style={{ padding: '1rem' }}>
      <span style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase' }}>
        {product.brand}
      </span>
      <h3 style={{ margin: '0.25rem 0', fontSize: '1rem', fontWeight: 600 }}>
        {product.name}
      </h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#2563eb' }}>
          ${product.price}
        </span>
        <span style={{ fontSize: '0.75rem', color: stockColor[product.stock] }}>
          {stockLabel[product.stock]}
        </span>
      </div>
      <Button
        variant="primary"
        size="sm"
        fullWidth
        style={{ marginTop: '1rem' }}
        icon={<Icon name="cart-add" size={16} />}
        disabled={product.stock === 'out-of-stock'}
      >
        {product.stock === 'out-of-stock' ? 'No disponible' : 'Añadir al carrito'}
      </Button>
    </div>
  </Card>
)

const meta = {
  title: 'UI/PaginatedGrid',
  component: PaginatedGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    itemsPerPage: {
      control: { type: 'select' },
      options: [8, 12, 20, 40],
      description: 'Número de items por página',
    },
    columns: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
      description: 'Número máximo de columnas en desktop',
    },
    showItemsPerPageSelector: {
      control: 'boolean',
      description: 'Mostrar selector de items por página',
    },
    itemsLabel: {
      control: 'text',
      description: 'Etiqueta para los items (ej: "productos", "usuarios")',
    },
  },
} satisfies Meta<typeof PaginatedGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: mockProducts,
    renderItem: (product: Product) => <ProductCard product={product} />,
    itemsPerPage: 12,
    itemsLabel: 'productos',
    columns: 4,
    keyExtractor: (item: Product) => item.id,
  },
}

export const EightPerPage: Story = {
  args: {
    items: mockProducts,
    renderItem: (product: Product) => <ProductCard product={product} />,
    itemsPerPage: 8,
    itemsLabel: 'productos',
    columns: 4,
    keyExtractor: (item: Product) => item.id,
  },
}

export const ThreeColumns: Story = {
  args: {
    items: mockProducts,
    renderItem: (product: Product) => <ProductCard product={product} />,
    itemsPerPage: 9,
    itemsLabel: 'productos',
    columns: 3,
    keyExtractor: (item: Product) => item.id,
  },
}

export const TwoColumns: Story = {
  args: {
    items: mockProducts.slice(0, 20),
    renderItem: (product: Product) => <ProductCard product={product} />,
    itemsPerPage: 6,
    itemsLabel: 'productos',
    columns: 2,
    keyExtractor: (item: Product) => item.id,
  },
}

export const WithoutSelector: Story = {
  args: {
    items: mockProducts,
    renderItem: (product: Product) => <ProductCard product={product} />,
    itemsPerPage: 12,
    showItemsPerPageSelector: false,
    itemsLabel: 'productos',
    columns: 4,
    keyExtractor: (item: Product) => item.id,
  },
}

export const FewProducts: Story = {
  args: {
    items: mockProducts.slice(0, 7),
    renderItem: (product: Product) => <ProductCard product={product} />,
    itemsPerPage: 12,
    itemsLabel: 'productos',
    columns: 4,
    keyExtractor: (item: Product) => item.id,
  },
}

export const SinglePage: Story = {
  args: {
    items: mockProducts.slice(0, 8),
    renderItem: (product: Product) => <ProductCard product={product} />,
    itemsPerPage: 12,
    itemsLabel: 'productos',
    columns: 4,
    keyExtractor: (item: Product) => item.id,
  },
}

export const ManyPages: Story = {
  args: {
    items: generateMockProducts(200),
    renderItem: (product: Product) => <ProductCard product={product} />,
    itemsPerPage: 12,
    itemsLabel: 'productos',
    columns: 4,
    keyExtractor: (item: Product) => item.id,
  },
}

export const EmptyGrid: Story = {
  args: {
    items: [],
    renderItem: (product: Product) => <ProductCard product={product} />,
    itemsPerPage: 12,
    itemsLabel: 'productos',
    columns: 4,
  },
}
