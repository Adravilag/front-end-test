import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Carousel } from './Carousel'
import { Card } from '../Card'
import { Image } from '../Image'

const meta = {
  title: 'UI/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    autoPlay: {
      control: 'boolean',
      description: 'Reproducción automática',
    },
    autoPlayInterval: {
      control: { type: 'number', min: 1000, max: 10000, step: 500 },
      description: 'Intervalo de autoplay (ms)',
    },
    showIndicators: {
      control: 'boolean',
      description: 'Mostrar indicadores',
    },
    showArrows: {
      control: 'boolean',
      description: 'Mostrar flechas',
    },
    loop: {
      control: 'boolean',
      description: 'Loop infinito',
    },
    initialIndex: {
      control: { type: 'number', min: 0, max: 4 },
      description: 'Índice inicial',
    },
    width: {
      control: 'text',
      description: 'Ancho del carrusel (px o string CSS)',
    },
    height: {
      control: 'text',
      description: 'Alto del carrusel (px o string CSS)',
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

const slides = [
  <div key="1" style={{ height: '200px', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem' }}>
    Slide 1
  </div>,
  <div key="2" style={{ height: '200px', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem' }}>
    Slide 2
  </div>,
  <div key="3" style={{ height: '200px', background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem' }}>
    Slide 3
  </div>,
  <div key="4" style={{ height: '200px', background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem' }}>
    Slide 4
  </div>,
]

export const Default: Story = {
  args: {
    children: slides,
  },
}

export const AutoPlay: Story = {
  args: {
    children: slides,
    autoPlay: true,
    autoPlayInterval: 2000,
  },
}

export const NoIndicators: Story = {
  args: {
    children: slides,
    showIndicators: false,
  },
}

export const NoArrows: Story = {
  args: {
    children: slides,
    showArrows: false,
  },
}

export const NoLoop: Story = {
  args: {
    children: slides,
    loop: false,
  },
}

export const StartAtIndex: Story = {
  args: {
    children: slides,
    initialIndex: 2,
  },
}

export const WithCards: Story = {
  args: {
    children: [
      <Card key="1" variant="elevated" style={{ margin: '0 1rem' }}>
        <h3>Card 1</h3>
        <p>First card content</p>
      </Card>,
      <Card key="2" variant="elevated" style={{ margin: '0 1rem' }}>
        <h3>Card 2</h3>
        <p>Second card content</p>
      </Card>,
      <Card key="3" variant="elevated" style={{ margin: '0 1rem' }}>
        <h3>Card 3</h3>
        <p>Third card content</p>
      </Card>,
    ],
  },
}

export const ImageCarousel: Story = {
  args: {
    children: [
      <img key="1" src="https://picsum.photos/800/300?random=1" alt="Slide 1" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />,
      <img key="2" src="https://picsum.photos/800/300?random=2" alt="Slide 2" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />,
      <img key="3" src="https://picsum.photos/800/300?random=3" alt="Slide 3" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />,
    ],
    autoPlay: true,
    autoPlayInterval: 3000,
  },
}

export const WithPlaceholder: Story = {
  args: {
    children: [
      <Image key="1" src="/broken-image-1.jpg" alt="Placeholder 1" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />,
      <Image key="2" src="/broken-image-2.jpg" alt="Placeholder 2" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />,
      <Image key="3" src="/broken-image-3.jpg" alt="Placeholder 3" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Usa el componente Image para mostrar placeholder cuando las imágenes no cargan.',
      },
    },
  },
}

export const MinimalControls: Story = {
  args: {
    children: slides,
    showIndicators: true,
    showArrows: false,
  },
}

// =============================================
// Carruseles de Productos
// =============================================

const productImages = [
  'https://picsum.photos/400/400?random=10',
  'https://picsum.photos/400/400?random=11',
  'https://picsum.photos/400/400?random=12',
  'https://picsum.photos/400/400?random=13',
]

export const ProductCarouselSmall: Story = {
  args: {
    children: productImages.map((src, i) => (
      <Image key={i} src={src} alt={`Producto ${i + 1}`} />
    )),
    width: 200,
    height: 200,
    showIndicators: true,
    showArrows: true,
    loop: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Carrusel pequeño para thumbnail de productos (200x200px).',
      },
    },
  },
}

export const ProductCarouselMedium: Story = {
  args: {
    children: productImages.map((src, i) => (
      <Image key={i} src={src} alt={`Producto ${i + 1}`} />
    )),
    width: 350,
    height: 350,
    showIndicators: true,
    showArrows: true,
    loop: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Carrusel mediano para vista de producto (350x350px).',
      },
    },
  },
}

export const ProductCarouselLarge: Story = {
  args: {
    children: productImages.map((src, i) => (
      <Image key={i} src={src} alt={`Producto ${i + 1}`} />
    )),
    width: 500,
    height: 400,
    showIndicators: true,
    showArrows: true,
    loop: true,
    autoPlay: true,
    autoPlayInterval: 4000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Carrusel grande para detalle de producto con autoplay (500x400px).',
      },
    },
  },
}

export const ProductCarouselWithPlaceholder: Story = {
  args: {
    children: [
      <Image key="1" src="/invalid-product-1.jpg" alt="Producto 1" />,
      <Image key="2" src="/invalid-product-2.jpg" alt="Producto 2" />,
      <Image key="3" src="/invalid-product-3.jpg" alt="Producto 3" />,
    ],
    width: 300,
    height: 300,
    showIndicators: true,
    showArrows: true,
    loop: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Carrusel de productos con placeholder cuando las imágenes no cargan.',
      },
    },
  },
}

export const ResponsiveProductCarousel: Story = {
  args: {
    children: productImages.map((src, i) => (
      <Image key={i} src={src} alt={`Producto ${i + 1}`} />
    )),
    width: '100%',
    height: 300,
    showIndicators: true,
    showArrows: true,
    loop: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Carrusel responsivo que toma el 100% del ancho del contenedor.',
      },
    },
  },
}
