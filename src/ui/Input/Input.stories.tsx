import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Input } from './Input'
import { Icon } from '../Icon'

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del input',
    },
    label: {
      control: 'text',
      description: 'Etiqueta del campo',
    },
    error: {
      control: 'text',
      description: 'Mensaje de error',
    },
    helperText: {
      control: 'text',
      description: 'Texto de ayuda',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder',
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilitado',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Ancho completo',
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'tu@email.com',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Mínimo 8 caracteres',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    value: 'invalid-email',
    error: 'Por favor ingresa un email válido',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    value: 'Cannot edit',
    disabled: true,
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small input',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large input',
  },
}

export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leftIcon: <Icon name="search" size={16} />,
  },
}

export const WithRightIcon: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    rightIcon: <Icon name="user" size={16} />,
  },
}

export const WithBothIcons: Story = {
  args: {
    placeholder: 'Search users...',
    leftIcon: <Icon name="search" size={16} />,
    rightIcon: <Icon name="close" size={16} />,
  },
}

export const FullWidth: Story = {
  args: {
    label: 'Full Width',
    placeholder: 'Full width input',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Input label="Normal" placeholder="Normal input" />
      <Input label="With Helper" placeholder="Input" helperText="This is helper text" />
      <Input label="With Error" placeholder="Input" error="This field is required" />
      <Input label="Disabled" placeholder="Disabled" disabled />
    </div>
  ),
}
