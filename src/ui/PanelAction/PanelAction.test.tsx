import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PanelAction } from './PanelAction'

describe('PanelAction', () => {
  it('renderiza contenido correctamente', () => {
    render(<PanelAction>Mensaje de prueba</PanelAction>)
    expect(screen.getByText('Mensaje de prueba')).toBeInTheDocument()
  })

  it('renderiza título y descripción', () => {
    render(
      <PanelAction title="Título" description="Descripción">
        Contenido
      </PanelAction>
    )
    
    expect(screen.getByText('Título')).toBeInTheDocument()
    expect(screen.getByText('Descripción')).toBeInTheDocument()
    expect(screen.getByText('Contenido')).toBeInTheDocument()
  })

  it('aplica variante default por defecto', () => {
    const { container } = render(<PanelAction>Test</PanelAction>)
    expect(container.querySelector('.panel-action')).toHaveClass('panel-action-default')
  })

  it('aplica variantes correctamente', () => {
    const { container, rerender } = render(<PanelAction variant="info">Test</PanelAction>)
    expect(container.querySelector('.panel-action')).toHaveClass('panel-action-info')

    rerender(<PanelAction variant="success">Test</PanelAction>)
    expect(container.querySelector('.panel-action')).toHaveClass('panel-action-success')

    rerender(<PanelAction variant="warning">Test</PanelAction>)
    expect(container.querySelector('.panel-action')).toHaveClass('panel-action-warning')

    rerender(<PanelAction variant="error">Test</PanelAction>)
    expect(container.querySelector('.panel-action')).toHaveClass('panel-action-error')
  })

  it('renderiza icono', () => {
    render(<PanelAction icon={<span data-testid="icon">🔔</span>}>Test</PanelAction>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renderiza acciones', () => {
    render(
      <PanelAction actions={<button>Acción</button>}>
        Test
      </PanelAction>
    )
    expect(screen.getByRole('button', { name: 'Acción' })).toBeInTheDocument()
  })

  it('muestra botón de cerrar cuando dismissible=true', () => {
    render(<PanelAction dismissible>Test</PanelAction>)
    expect(screen.getByLabelText('Cerrar')).toBeInTheDocument()
  })

  it('no muestra botón de cerrar cuando dismissible=false', () => {
    render(<PanelAction>Test</PanelAction>)
    expect(screen.queryByLabelText('Cerrar')).not.toBeInTheDocument()
  })

  it('llama onDismiss al cerrar', () => {
    const onDismiss = vi.fn()
    render(<PanelAction dismissible onDismiss={onDismiss}>Test</PanelAction>)
    
    fireEvent.click(screen.getByLabelText('Cerrar'))
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('tiene role correcto según variante', () => {
    const { rerender } = render(<PanelAction variant="info">Test</PanelAction>)
    expect(screen.getByRole('status')).toBeInTheDocument()

    rerender(<PanelAction variant="warning">Test</PanelAction>)
    expect(screen.getByRole('alert')).toBeInTheDocument()

    rerender(<PanelAction variant="error">Test</PanelAction>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('acepta clases CSS adicionales', () => {
    const { container } = render(<PanelAction className="custom">Test</PanelAction>)
    expect(container.querySelector('.panel-action')).toHaveClass('custom')
  })
})
