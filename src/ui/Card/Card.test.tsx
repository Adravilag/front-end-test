import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('Card', () => {
  it('renderiza contenido correctamente', () => {
    render(<Card>Contenido de prueba</Card>)
    expect(screen.getByText('Contenido de prueba')).toBeInTheDocument()
  })

  it('aplica variante default por defecto', () => {
    const { container } = render(<Card>Test</Card>)
    expect(container.querySelector('.card')).toHaveClass('card-default')
  })

  it('aplica variantes correctamente', () => {
    const { container, rerender } = render(<Card variant="outlined">Test</Card>)
    expect(container.querySelector('.card')).toHaveClass('card-outlined')

    rerender(<Card variant="elevated">Test</Card>)
    expect(container.querySelector('.card')).toHaveClass('card-elevated')
  })

  it('renderiza header', () => {
    render(<Card header={<h3>Título</h3>}>Contenido</Card>)
    expect(screen.getByRole('heading', { name: 'Título' })).toBeInTheDocument()
  })

  it('renderiza footer', () => {
    render(<Card footer={<span>Footer</span>}>Contenido</Card>)
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('renderiza imagen', () => {
    render(<Card image="/test.jpg" imageAlt="Test image">Contenido</Card>)
    const img = screen.getByRole('img', { name: 'Test image' })
    expect(img).toHaveAttribute('src', '/test.jpg')
  })

  it('aplica noPadding correctamente', () => {
    const { container } = render(<Card noPadding>Test</Card>)
    expect(container.querySelector('.card-body')).toHaveClass('card-body-no-padding')
  })

  it('acepta clases CSS adicionales', () => {
    const { container } = render(<Card className="custom-class">Test</Card>)
    expect(container.querySelector('.card')).toHaveClass('custom-class')
  })

  it('pasa props HTML adicionales', () => {
    const { container } = render(<Card data-testid="custom-card">Test</Card>)
    expect(container.querySelector('[data-testid="custom-card"]')).toBeInTheDocument()
  })
})
