import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Image } from './Image'

describe('Image', () => {
  it('renderiza correctamente', () => {
    render(<Image src="/test.jpg" alt="Test" />)
    expect(screen.getByRole('img', { name: 'Test' })).toBeInTheDocument()
  })

  it('usa el src proporcionado', () => {
    render(<Image src="/photo.jpg" alt="Photo" />)
    expect(screen.getByRole('img')).toHaveAttribute('src', '/photo.jpg')
  })

  it('muestra placeholder cuando la imagen falla', () => {
    render(<Image src="/broken.jpg" alt="Broken" />)
    const img = screen.getByRole('img')
    
    fireEvent.error(img)
    
    expect(img).toHaveAttribute('src', '/assets/images/product-placeholder.svg')
  })

  it('usa fallback personalizado', () => {
    render(<Image src="/broken.jpg" alt="Broken" fallback="/custom.svg" />)
    const img = screen.getByRole('img')
    
    fireEvent.error(img)
    
    expect(img).toHaveAttribute('src', '/custom.svg')
  })

  it('llama onError cuando la imagen falla', () => {
    const handleError = vi.fn()
    render(<Image src="/broken.jpg" alt="Broken" onError={handleError} />)
    
    fireEvent.error(screen.getByRole('img'))
    
    expect(handleError).toHaveBeenCalled()
  })

  it('no reemplaza src múltiples veces', () => {
    render(<Image src="/broken.jpg" alt="Broken" />)
    const img = screen.getByRole('img')
    
    fireEvent.error(img)
    fireEvent.error(img)
    
    expect(img).toHaveAttribute('src', '/assets/images/product-placeholder.svg')
  })

  it('pasa props adicionales a img', () => {
    render(<Image src="/test.jpg" alt="Test" className="custom" data-testid="custom-img" />)
    const img = screen.getByTestId('custom-img')
    
    expect(img).toHaveClass('custom')
  })
})
