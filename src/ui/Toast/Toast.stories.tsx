import type { Meta, StoryObj } from '@storybook/react'
import { Toast } from './Toast'
import { useState } from 'react'

const meta: Meta<typeof Toast> = {
  title: 'UI/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'Mensaje a mostrar en el toast',
    },
    title: {
      control: 'text',
      description: 'Título personalizado (opcional)',
    },
    type: {
      control: 'select',
      options: ['info', 'warning', 'error', 'success'],
      description: 'Tipo de toast que determina el color y el icono',
    },
    duration: {
      control: 'number',
      description: 'Duración en milisegundos antes de auto-cerrar',
    },
    showProgress: {
      control: 'boolean',
      description: 'Mostrar barra de progreso',
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Callback cuando se cierra el toast',
    },
  },
}

export default meta
type Story = StoryObj<typeof Toast>

export const Info: Story = {
  args: {
    message: 'Tu sesión ha sido actualizada correctamente.',
    type: 'info',
    duration: 30000,
    showProgress: true,
  },
}

export const Warning: Story = {
  args: {
    message: 'El carrito ha sido reiniciado porque la sesión expiró en el servidor.',
    type: 'warning',
    duration: 30000,
    showProgress: true,
  },
}

export const Error: Story = {
  args: {
    message: 'No se pudo conectar con el servidor. Por favor, inténtalo de nuevo.',
    type: 'error',
    duration: 30000,
    showProgress: true,
  },
}

export const Success: Story = {
  args: {
    message: 'Producto añadido al carrito correctamente.',
    type: 'success',
    duration: 30000,
    showProgress: true,
  },
}

export const CustomTitle: Story = {
  args: {
    title: 'Carrito reiniciado',
    message: 'La sesión del servidor ha expirado. Los productos han sido eliminados.',
    type: 'warning',
    duration: 30000,
    showProgress: true,
  },
}

export const WithoutProgress: Story = {
  args: {
    message: 'Este toast no tiene barra de progreso.',
    type: 'info',
    duration: 30000,
    showProgress: false,
  },
}

export const LongMessage: Story = {
  args: {
    message: 'Este es un mensaje muy largo que debería ajustarse correctamente dentro del toast sin romper el diseño. La información adicional se mostrará en múltiples líneas si es necesario.',
    type: 'info',
    duration: 30000,
    showProgress: true,
  },
}

// Story interactiva que muestra/oculta el toast
const ToastDemo = () => {
  const [toasts, setToasts] = useState<Array<{ id: number; type: 'info' | 'warning' | 'error' | 'success'; message: string }>>([])

  const showToast = (type: 'info' | 'warning' | 'error' | 'success') => {
    const messages = {
      info: 'Tu sesión ha sido actualizada correctamente.',
      warning: 'El carrito ha sido reiniciado porque la sesión expiró.',
      error: 'No se pudo conectar con el servidor.',
      success: 'Producto añadido al carrito correctamente.',
    }
    
    const id = Date.now()
    setToasts(prev => [...prev, { id, type, message: messages[type] }])
  }

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '24px', 
      padding: '40px',
      minHeight: '400px',
      background: '#f9fafb',
      borderRadius: '12px'
    }}>
      <div>
        <h3 style={{ margin: '0 0 8px 0', color: '#1f2937' }}>Demo Interactiva</h3>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
          Haz clic en los botones para mostrar diferentes tipos de toast
        </p>
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => showToast('info')} 
          style={{ 
            padding: '10px 20px', 
            cursor: 'pointer',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 500,
            transition: 'transform 0.1s, box-shadow 0.1s'
          }}
        >
          Info
        </button>
        <button 
          onClick={() => showToast('warning')} 
          style={{ 
            padding: '10px 20px', 
            cursor: 'pointer',
            background: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 500
          }}
        >
          Warning
        </button>
        <button 
          onClick={() => showToast('error')} 
          style={{ 
            padding: '10px 20px', 
            cursor: 'pointer',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 500
          }}
        >
          Error
        </button>
        <button 
          onClick={() => showToast('success')} 
          style={{ 
            padding: '10px 20px', 
            cursor: 'pointer',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 500
          }}
        >
          Success
        </button>
      </div>
      {toasts.map((toast, index) => (
        <div 
          key={toast.id} 
          style={{ 
            position: 'fixed', 
            bottom: `${32 + index * 100}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000 + index
          }}
        >
          <Toast
            message={toast.message}
            type={toast.type}
            onDismiss={() => removeToast(toast.id)}
            duration={5000}
          />
        </div>
      ))}
    </div>
  )
}

export const Interactive: Story = {
  render: () => <ToastDemo />,
  parameters: {
    layout: 'fullscreen',
  },
}
