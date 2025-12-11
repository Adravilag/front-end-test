import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Header } from './Header'

// Mock useCart
vi.mock('../../context/CartContext', () => ({
  useCart: () => ({ count: 0 })
}))

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('Header', () => {
  it('renders with default logo', () => {
    renderWithRouter(<Header />)
    expect(screen.getByText('Logo')).toBeInTheDocument()
  })

  it('renders custom logo', () => {
    renderWithRouter(<Header logo={<span>Mi App</span>} />)
    expect(screen.getByText('Mi App')).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    const navItems = [
      { label: 'Inicio', href: '/' },
      { label: 'Acerca', href: '/about' },
    ]
    renderWithRouter(<Header navItems={navItems} />)
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Acerca')).toBeInTheDocument()
  })

  it('renders active navigation item with correct class', () => {
    const navItems = [
      { label: 'Inicio', href: '/', active: true },
    ]
    renderWithRouter(<Header navItems={navItems} />)
    const navItem = screen.getAllByText('Inicio')[0]
    expect(navItem).toHaveClass('header-nav-item-active')
  })

  it('renders navigation items with icons', () => {
    const navItems = [
      { label: 'Inicio', href: '/', icon: 'home' as const },
    ]
    renderWithRouter(<Header navItems={navItems} />)
    expect(screen.getByText('Inicio')).toBeInTheDocument()
  })

  it('renders custom actions', () => {
    renderWithRouter(<Header actions={<button>Login</button>} />)
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('applies sticky class when sticky is true', () => {
    const { container } = renderWithRouter(<Header sticky />)
    expect(container.querySelector('.header-sticky')).toBeInTheDocument()
  })

  it('does not apply sticky class when sticky is false', () => {
    const { container } = renderWithRouter(<Header sticky={false} />)
    expect(container.querySelector('.header-sticky')).not.toBeInTheDocument()
  })

  it('toggles mobile menu on button click', () => {
    const navItems = [{ label: 'Inicio', href: '/' }]
    renderWithRouter(<Header navItems={navItems} />)
    
    const menuButton = screen.getByRole('button', { name: /abrir menú/i })
    fireEvent.click(menuButton)
    
    expect(screen.getByRole('button', { name: /cerrar menú/i })).toBeInTheDocument()
  })

  it('calls onMenuClick when menu button is clicked', () => {
    const handleMenuClick = vi.fn()
    renderWithRouter(<Header onMenuClick={handleMenuClick} />)
    
    const menuButton = screen.getByRole('button', { name: /abrir menú/i })
    fireEvent.click(menuButton)
    
    expect(handleMenuClick).toHaveBeenCalledTimes(1)
  })

  it('shows search button when showSearch is true', () => {
    renderWithRouter(<Header showSearch />)
    expect(screen.getByRole('button', { name: /abrir búsqueda/i })).toBeInTheDocument()
  })

  it('opens search input when search button is clicked', () => {
    renderWithRouter(<Header showSearch />)
    
    const searchButton = screen.getByRole('button', { name: /abrir búsqueda/i })
    fireEvent.click(searchButton)
    
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument()
  })

  it('calls onSearch when search form is submitted', () => {
    const handleSearch = vi.fn()
    renderWithRouter(<Header showSearch onSearch={handleSearch} />)
    
    const searchButton = screen.getByRole('button', { name: /abrir búsqueda/i })
    fireEvent.click(searchButton)
    
    const input = screen.getByPlaceholderText('Buscar...')
    fireEvent.change(input, { target: { value: 'test query' } })
    fireEvent.submit(input.closest('form')!)
    
    expect(handleSearch).toHaveBeenCalledWith('test query')
  })

  it('applies custom className', () => {
    const { container } = renderWithRouter(<Header className="custom-header" />)
    expect(container.querySelector('.custom-header')).toBeInTheDocument()
  })
})
