import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from './Header'

// Mock useCart
vi.mock('../../context/CartContext', () => ({
  useCart: () => ({ count: 0 })
}))

describe('Header', () => {
  it('renders with default logo', () => {
    render(<Header />)
    expect(screen.getByText('Logo')).toBeInTheDocument()
  })

  it('renders custom logo', () => {
    render(<Header logo={<span>Mi App</span>} />)
    expect(screen.getByText('Mi App')).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    const navItems = [
      { label: 'Inicio', href: '/' },
      { label: 'Acerca', href: '/about' },
    ]
    render(<Header navItems={navItems} />)
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Acerca')).toBeInTheDocument()
  })

  it('renders active navigation item with correct class', () => {
    const navItems = [
      { label: 'Inicio', href: '/', active: true },
    ]
    render(<Header navItems={navItems} />)
    const navItem = screen.getAllByText('Inicio')[0]
    expect(navItem).toHaveClass('header-nav-item-active')
  })

  it('renders navigation items with icons', () => {
    const navItems = [
      { label: 'Inicio', href: '/', icon: 'home' as const },
    ]
    render(<Header navItems={navItems} />)
    expect(screen.getByText('Inicio')).toBeInTheDocument()
  })

  it('renders custom actions', () => {
    render(<Header actions={<button>Login</button>} />)
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('applies sticky class when sticky is true', () => {
    const { container } = render(<Header sticky />)
    expect(container.querySelector('.header-sticky')).toBeInTheDocument()
  })

  it('does not apply sticky class when sticky is false', () => {
    const { container } = render(<Header sticky={false} />)
    expect(container.querySelector('.header-sticky')).not.toBeInTheDocument()
  })

  it('toggles mobile menu on button click', () => {
    const navItems = [{ label: 'Inicio', href: '/' }]
    render(<Header navItems={navItems} />)
    
    const menuButton = screen.getByRole('button', { name: /abrir menú/i })
    fireEvent.click(menuButton)
    
    expect(screen.getByRole('button', { name: /cerrar menú/i })).toBeInTheDocument()
  })

  it('calls onMenuClick when menu button is clicked', () => {
    const handleMenuClick = vi.fn()
    render(<Header onMenuClick={handleMenuClick} />)
    
    const menuButton = screen.getByRole('button', { name: /abrir menú/i })
    fireEvent.click(menuButton)
    
    expect(handleMenuClick).toHaveBeenCalledTimes(1)
  })

  it('shows search button when showSearch is true', () => {
    render(<Header showSearch />)
    expect(screen.getByRole('button', { name: /abrir búsqueda/i })).toBeInTheDocument()
  })

  it('opens search input when search button is clicked', () => {
    render(<Header showSearch />)
    
    const searchButton = screen.getByRole('button', { name: /abrir búsqueda/i })
    fireEvent.click(searchButton)
    
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument()
  })

  it('calls onSearch when search form is submitted', () => {
    const handleSearch = vi.fn()
    render(<Header showSearch onSearch={handleSearch} />)
    
    const searchButton = screen.getByRole('button', { name: /abrir búsqueda/i })
    fireEvent.click(searchButton)
    
    const input = screen.getByPlaceholderText('Buscar...')
    fireEvent.change(input, { target: { value: 'test query' } })
    fireEvent.submit(input.closest('form')!)
    
    expect(handleSearch).toHaveBeenCalledWith('test query')
  })

  it('applies custom className', () => {
    const { container } = render(<Header className="custom-header" />)
    expect(container.querySelector('.custom-header')).toBeInTheDocument()
  })
})
