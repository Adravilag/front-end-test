import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
  it('renderiza correctamente', () => {
    render(<Input placeholder="Escribe aquí" />)
    expect(screen.getByPlaceholderText('Escribe aquí')).toBeInTheDocument()
  })

  it('renderiza con etiqueta', () => {
    render(<Input label="Email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('aplica tamaños correctamente', () => {
    const { rerender } = render(<Input size="sm" />)
    expect(screen.getByRole('textbox')).toHaveClass('input-sm')

    rerender(<Input size="lg" />)
    expect(screen.getByRole('textbox')).toHaveClass('input-lg')
  })

  it('muestra mensaje de error', () => {
    render(<Input error="Campo requerido" />)
    
    expect(screen.getByRole('alert')).toHaveTextContent('Campo requerido')
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('muestra texto de ayuda', () => {
    render(<Input helperText="Mínimo 8 caracteres" />)
    expect(screen.getByText('Mínimo 8 caracteres')).toBeInTheDocument()
  })

  it('error tiene prioridad sobre helperText', () => {
    render(<Input error="Error" helperText="Ayuda" />)
    
    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.queryByText('Ayuda')).not.toBeInTheDocument()
  })

  it('maneja eventos onChange', () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } })
    expect(handleChange).toHaveBeenCalled()
  })

  it('renderiza iconos', () => {
    render(
      <Input
        leftIcon={<span data-testid="left">L</span>}
        rightIcon={<span data-testid="right">R</span>}
      />
    )
    
    expect(screen.getByTestId('left')).toBeInTheDocument()
    expect(screen.getByTestId('right')).toBeInTheDocument()
  })

  it('aplica fullWidth correctamente', () => {
    const { container } = render(<Input fullWidth />)
    expect(container.querySelector('.input-wrapper')).toHaveClass('input-full')
  })

  it('puede ser deshabilitado', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('acepta diferentes tipos', () => {
    const { container } = render(<Input type="password" />)
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('type', 'password')
  })
})
