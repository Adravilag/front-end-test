import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Carousel } from './Carousel'
import { Card } from '../Card'

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

export const MinimalControls: Story = {
  args: {
    children: slides,
    showIndicators: true,
    showArrows: false,
  },
}
