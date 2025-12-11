import type { Meta, StoryObj } from '@storybook/react'
import { Icon, ICON_NAMES } from './Icon'

const meta = {
  title: 'UI/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ICON_NAMES,
      description: 'Nombre del icono del sprite',
    },
    size: {
      control: { type: 'number', min: 12, max: 64, step: 4 },
      description: 'Tamaño en píxeles',
    },
    title: {
      control: 'text',
      description: 'Título accesible',
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'home',
    size: 24,
  },
}

export const WithTitle: Story = {
  args: {
    name: 'settings',
    size: 24,
    title: 'Configuración',
  },
}

export const Large: Story = {
  args: {
    name: 'user',
    size: 48,
  },
}

export const Small: Story = {
  args: {
    name: 'search',
    size: 16,
  },
}

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {ICON_NAMES.map((name) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0.5rem',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            minWidth: '80px',
          }}
        >
          <Icon name={name} size={24} />
          <span style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#6b7280' }}>
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
}
