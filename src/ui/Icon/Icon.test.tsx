import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Icon, ICON_NAMES } from './Icon'

describe('Icon', () => {
  it('renderiza el icono correctamente', () => {
    const { container } = render(<Icon name="home" />)
    const svg = container.querySelector('svg')
    
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('width', '24')
    expect(svg).toHaveAttribute('height', '24')
  })

  it('usa el tamaño personalizado', () => {
    const { container } = render(<Icon name="search" size={32} />)
    const svg = container.querySelector('svg')
    
    expect(svg).toHaveAttribute('width', '32')
    expect(svg).toHaveAttribute('height', '32')
  })

  it('referencia el sprite correctamente', () => {
    const { container } = render(<Icon name="user" />)
    const use = container.querySelector('use')
    
    expect(use).toHaveAttribute('href', '/sprite.svg#icon-user')
  })

  it('aplica clases CSS personalizadas', () => {
    const { container } = render(<Icon name="menu" className="custom-class" />)
    const svg = container.querySelector('svg')
    
    expect(svg).toHaveClass('custom-class')
  })

  it('es accesible cuando tiene título', () => {
    render(<Icon name="settings" title="Configuración" />)
    
    const svg = screen.getByRole('img', { name: 'Configuración' })
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('aria-hidden', 'false')
  })

  it('está oculto para lectores de pantalla sin título', () => {
    const { container } = render(<Icon name="close" />)
    const svg = container.querySelector('svg')
    
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('incluye elemento title cuando se proporciona', () => {
    const { container } = render(<Icon name="home" title="Inicio" />)
    const title = container.querySelector('title')
    
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Inicio')
  })

  it('todos los iconos del sprite están definidos', () => {
    expect(ICON_NAMES).toContain('home')
    expect(ICON_NAMES).toContain('arrow-left')
    expect(ICON_NAMES).toContain('arrow-right')
    expect(ICON_NAMES).toContain('search')
    expect(ICON_NAMES).toContain('close')
    expect(ICON_NAMES).toContain('menu')
    expect(ICON_NAMES).toContain('user')
    expect(ICON_NAMES).toContain('settings')
  })

  it('acepta props SVG adicionales', () => {
    const { container } = render(
      <Icon name="home" data-testid="custom-icon" fill="red" />
    )
    const svg = container.querySelector('svg')
    
    expect(svg).toHaveAttribute('data-testid', 'custom-icon')
    expect(svg).toHaveAttribute('fill', 'red')
  })
})
