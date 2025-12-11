import type { Meta, StoryObj } from '@storybook/react'
import { Image } from './Image'

const meta = {
  title: 'UI/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'URL de la imagen',
    },
    alt: {
      control: 'text',
      description: 'Texto alternativo',
    },
    fallback: {
      control: 'text',
      description: 'URL del placeholder cuando falla',
    },
  },
} satisfies Meta<typeof Image>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'Random image',
    style: { width: '400px', height: '300px', objectFit: 'cover' },
  },
}

export const WithPlaceholder: Story = {
  args: {
    src: '/broken-image.jpg',
    alt: 'Broken image showing placeholder',
    style: { width: '400px', height: '300px', objectFit: 'cover' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Cuando la imagen no carga, se muestra el placeholder automáticamente.',
      },
    },
  },
}

export const CustomFallback: Story = {
  args: {
    src: '/broken-image.jpg',
    alt: 'Custom fallback',
    fallback: 'https://picsum.photos/400/300?grayscale',
    style: { width: '400px', height: '300px', objectFit: 'cover' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Puedes especificar un fallback personalizado con la prop `fallback`.',
      },
    },
  },
}
