import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'
import { Button } from '../Button'

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
      description: 'Variante visual',
    },
    noPadding: {
      control: 'boolean',
      description: 'Sin padding interno',
    },
    image: {
      control: 'text',
      description: 'URL de la imagen',
    },
    imageAlt: {
      control: 'text',
      description: 'Alt de la imagen',
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is a simple card with some content.',
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'This is an outlined card.',
  },
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'This is an elevated card with shadow.',
  },
}

export const WithHeader: Story = {
  args: {
    header: <h3 style={{ margin: 0 }}>Card Title</h3>,
    children: 'This card has a header section.',
  },
}

export const WithFooter: Story = {
  args: {
    children: 'This card has a footer with actions.',
    footer: (
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button size="sm">Save</Button>
      </div>
    ),
  },
}

export const WithHeaderAndFooter: Story = {
  args: {
    header: <h3 style={{ margin: 0 }}>Card Title</h3>,
    children: (
      <p style={{ margin: 0 }}>
        This is a complete card with header, body content, and footer actions.
      </p>
    ),
    footer: (
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm">Confirm</Button>
      </div>
    ),
  },
}

export const WithImage: Story = {
  args: {
    image: 'https://picsum.photos/400/200',
    imageAlt: 'Random placeholder image',
    children: (
      <>
        <h4 style={{ margin: '0 0 0.5rem' }}>Beautiful Image</h4>
        <p style={{ margin: 0, color: '#6b7280' }}>
          This card features an image at the top.
        </p>
      </>
    ),
  },
}

export const NoPadding: Story = {
  args: {
    noPadding: true,
    children: (
      <div style={{ padding: '1rem', background: '#f3f4f6' }}>
        Custom padded content
      </div>
    ),
  },
}

export const CompleteCard: Story = {
  args: {
    variant: 'elevated',
    image: 'https://picsum.photos/400/150',
    imageAlt: 'Product image',
    header: <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Featured</span>,
    children: (
      <>
        <h4 style={{ margin: '0 0 0.5rem' }}>Product Name</h4>
        <p style={{ margin: '0 0 0.5rem', color: '#6b7280' }}>
          Short product description goes here.
        </p>
        <p style={{ margin: 0, fontWeight: 'bold' }}>$99.99</p>
      </>
    ),
    footer: <Button fullWidth>Add to Cart</Button>,
  },
}

export const AllVariants: Story = {
  args: { children: 'Card content' },
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Card variant="default" style={{ width: '200px' }}>Default</Card>
      <Card variant="outlined" style={{ width: '200px' }}>Outlined</Card>
      <Card variant="elevated" style={{ width: '200px' }}>Elevated</Card>
    </div>
  ),
}
