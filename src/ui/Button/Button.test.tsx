import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renderiza correctamente', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('aplica la variante primary por defecto', () => {
    render(<Button>Test</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('btn-primary')
  })

  it('aplica variantes correctamente', () => {
    const { rerender } = render(<Button variant="secondary">Test</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-secondary')

    rerender(<Button variant="outline">Test</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-outline')

    rerender(<Button variant="danger">Test</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-danger')
  })

  it('aplica tamaños correctamente', () => {
    const { rerender } = render(<Button size="sm">Test</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-sm')

    rerender(<Button size="lg">Test</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-lg')
  })

  it('maneja el estado de carga', () => {
    render(<Button loading>Loading</Button>)
    const button = screen.getByRole('button')
    
    expect(button).toBeDisabled()
    expect(button).toHaveClass('btn-loading')
  })

  it('está deshabilitado cuando disabled=true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('maneja eventos onClick', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('no dispara onClick cuando está en loading', () => {
    const handleClick = vi.fn()
    render(<Button loading onClick={handleClick}>Click</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('renderiza iconos izquierdo y derecho', () => {
    render(
      <Button 
        leftIcon={<span data-testid="left-icon">L</span>}
        rightIcon={<span data-testid="right-icon">R</span>}
      >
        Content
      </Button>
    )
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })

  it('aplica fullWidth correctamente', () => {
    render(<Button fullWidth>Full Width</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-full')
  })

  it('acepta clases CSS adicionales', () => {
    render(<Button className="custom-class">Test</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })
})
