import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { Breadcrumb } from './Breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'radio',
      options: ['arrow', 'slash'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Móviles', href: '/products' },
      { label: 'iPhone 15 Pro' },
    ],
  },
}

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'iPhone 15 Pro' },
    ],
  },
}

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Inicio' }],
  },
}

export const WithSlashSeparator: Story = {
  args: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Móviles', href: '/products' },
      { label: 'Samsung Galaxy S24' },
    ],
    separator: 'slash',
  },
}

export const LongPath: Story = {
  args: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Electrónica', href: '/electronics' },
      { label: 'Móviles', href: '/electronics/phones' },
      { label: 'Apple', href: '/electronics/phones/apple' },
      { label: 'iPhone 15 Pro Max 256GB' },
    ],
  },
}

export const AllLinked: Story = {
  args: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Móviles', href: '/products' },
      { label: 'iPhone 15 Pro', href: '/product/1' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Even if all items have href, the last item will not be rendered as a link.',
      },
    },
  },
}
