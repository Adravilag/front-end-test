import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Header } from './Header'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'

const meta = {
  title: 'Layouts/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    sticky: {
      control: 'boolean',
      description: 'Header sticky en el top',
    },
    showSearch: {
      control: 'boolean',
      description: 'Mostrar buscador',
    },
  },
  args: {
    onMenuClick: fn(),
    onSearch: fn(),
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

const defaultNavItems = [
  { label: 'Inicio', href: '/', active: true },
  { label: 'Productos', href: '/products' },
  { label: 'Categorías', href: '/categories' },
  { label: 'Contacto', href: '/contact' },
]

export const Default: Story = {
  args: {
    navItems: defaultNavItems,
  },
}

export const WithLogo: Story = {
  args: {
    logo: <span style={{ fontWeight: 700, fontSize: '1.25rem', color: '#3b82f6' }}>MiTienda</span>,
    navItems: defaultNavItems,
  },
}

export const WithSearch: Story = {
  args: {
    logo: <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>MiApp</span>,
    navItems: defaultNavItems,
    showSearch: true,
  },
}

export const WithActions: Story = {
  args: {
    logo: <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>MiApp</span>,
    navItems: defaultNavItems,
    showSearch: true,
    actions: (
      <>
        <Button variant="ghost" size="sm">
          <Icon name="user" size={18} />
          <span className="hidden-mobile">Mi Cuenta</span>
        </Button>
        <Button variant="primary" size="sm">
          Iniciar Sesión
        </Button>
      </>
    ),
  },
}

export const WithIcons: Story = {
  args: {
    logo: <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>MiApp</span>,
    navItems: [
      { label: 'Inicio', href: '/', icon: 'home', active: true },
      { label: 'Perfil', href: '/profile', icon: 'user' },
      { label: 'Ajustes', href: '/settings', icon: 'settings' },
    ],
    showSearch: true,
  },
}

export const NotSticky: Story = {
  args: {
    navItems: defaultNavItems,
    sticky: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header sin posición sticky.',
      },
    },
  },
}

export const MinimalHeader: Story = {
  args: {
    logo: <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>Logo</span>,
    actions: (
      <Button variant="outline" size="sm">
        Contactar
      </Button>
    ),
  },
}

export const EcommerceHeader: Story = {
  args: {
    logo: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ 
          width: 32, 
          height: 32, 
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', 
          borderRadius: '0.5rem' 
        }} />
        <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>ShopApp</span>
      </div>
    ),
    navItems: [
      { label: 'Inicio', href: '/', active: true },
      { label: 'Catálogo', href: '/catalog' },
      { label: 'Ofertas', href: '/offers' },
      { label: 'Contacto', href: '/contact' },
    ],
    showSearch: true,
    actions: (
      <>
        <button 
          style={{ 
            position: 'relative',
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            padding: '0.5rem',
          }}
          aria-label="Carrito"
        >
          <Icon name="menu" size={24} />
          <span style={{
            position: 'absolute',
            top: 0,
            right: 0,
            background: '#ef4444',
            color: 'white',
            fontSize: '0.625rem',
            fontWeight: 700,
            width: '1rem',
            height: '1rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>3</span>
        </button>
        <Button variant="primary" size="sm">
          <Icon name="user" size={16} />
          Cuenta
        </Button>
      </>
    ),
  },
}
