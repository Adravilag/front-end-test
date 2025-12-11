import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { PanelAction } from './PanelAction'
import { Button } from '../Button'
import { Icon } from '../Icon'

const meta = {
  title: 'UI/PanelAction',
  component: PanelAction,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
      description: 'Variante visual',
    },
    title: {
      control: 'text',
      description: 'Título del panel',
    },
    description: {
      control: 'text',
      description: 'Descripción',
    },
    dismissible: {
      control: 'boolean',
      description: 'Puede cerrarse',
    },
  },
  args: {
    onDismiss: fn(),
  },
} satisfies Meta<typeof PanelAction>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is a default panel action message.',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    description: 'This is an informational message for the user.',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    description: 'Your changes have been saved successfully.',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    description: 'Please review your changes before proceeding.',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    description: 'Something went wrong. Please try again.',
  },
}

export const WithIcon: Story = {
  args: {
    variant: 'info',
    icon: <Icon name="settings" size={20} />,
    title: 'Configuration Required',
    description: 'Please complete your profile settings.',
  },
}

export const WithActions: Story = {
  args: {
    variant: 'warning',
    title: 'Unsaved Changes',
    description: 'You have unsaved changes that will be lost.',
    actions: (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button variant="ghost" size="sm">Discard</Button>
        <Button size="sm">Save</Button>
      </div>
    ),
  },
}

export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'New Feature Available',
    description: 'Check out our latest update with new features.',
    dismissible: true,
  },
}

export const Complete: Story = {
  args: {
    variant: 'success',
    icon: <Icon name="user" size={20} />,
    title: 'Welcome Back!',
    description: 'Your account is ready. Start exploring the dashboard.',
    actions: <Button size="sm">Get Started</Button>,
    dismissible: true,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <PanelAction variant="default" title="Default">
        Default panel message
      </PanelAction>
      <PanelAction variant="info" title="Info">
        Informational panel message
      </PanelAction>
      <PanelAction variant="success" title="Success">
        Success panel message
      </PanelAction>
      <PanelAction variant="warning" title="Warning">
        Warning panel message
      </PanelAction>
      <PanelAction variant="error" title="Error">
        Error panel message
      </PanelAction>
    </div>
  ),
}

export const UpdateNotification: Story = {
  args: {
    variant: 'info',
    icon: <Icon name="arrow-right" size={20} />,
    title: 'Update Available',
    description: 'Version 2.0 is ready to install with new features and improvements.',
    actions: (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button variant="ghost" size="sm">Later</Button>
        <Button size="sm">Update Now</Button>
      </div>
    ),
    dismissible: true,
  },
}
