import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Carousel } from './Carousel'

const slides = [
  <div key="1">Slide 1</div>,
  <div key="2">Slide 2</div>,
  <div key="3">Slide 3</div>,
]

describe('Carousel', () => {
  it('renderiza todos los slides', () => {
    render(<Carousel>{slides}</Carousel>)
    
    expect(screen.getByText('Slide 1')).toBeInTheDocument()
    expect(screen.getByText('Slide 2')).toBeInTheDocument()
    expect(screen.getByText('Slide 3')).toBeInTheDocument()
  })

  it('muestra indicadores por defecto', () => {
    render(<Carousel>{slides}</Carousel>)
    
    const indicators = screen.getAllByRole('tab')
    expect(indicators).toHaveLength(3)
  })

  it('oculta indicadores cuando showIndicators=false', () => {
    render(<Carousel showIndicators={false}>{slides}</Carousel>)
    
    expect(screen.queryAllByRole('tab')).toHaveLength(0)
  })

  it('muestra flechas por defecto', () => {
    render(<Carousel>{slides}</Carousel>)
    
    expect(screen.getByLabelText('Slide anterior')).toBeInTheDocument()
    expect(screen.getByLabelText('Siguiente slide')).toBeInTheDocument()
  })

  it('oculta flechas cuando showArrows=false', () => {
    render(<Carousel showArrows={false}>{slides}</Carousel>)
    
    expect(screen.queryByLabelText('Slide anterior')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Siguiente slide')).not.toBeInTheDocument()
  })

  it('navega al siguiente slide', () => {
    const onChange = vi.fn()
    render(<Carousel onChange={onChange}>{slides}</Carousel>)
    
    fireEvent.click(screen.getByLabelText('Siguiente slide'))
    expect(onChange).toHaveBeenCalledWith(1)
  })

  it('navega al slide anterior', () => {
    const onChange = vi.fn()
    render(<Carousel initialIndex={1} onChange={onChange}>{slides}</Carousel>)
    
    fireEvent.click(screen.getByLabelText('Slide anterior'))
    expect(onChange).toHaveBeenCalledWith(0)
  })

  it('navega al hacer clic en indicador', () => {
    const onChange = vi.fn()
    render(<Carousel onChange={onChange}>{slides}</Carousel>)
    
    const indicators = screen.getAllByRole('tab')
    fireEvent.click(indicators[2])
    
    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('hace loop al final cuando loop=true', () => {
    const onChange = vi.fn()
    render(<Carousel initialIndex={2} onChange={onChange}>{slides}</Carousel>)
    
    fireEvent.click(screen.getByLabelText('Siguiente slide'))
    expect(onChange).toHaveBeenCalledWith(0)
  })

  it('no hace loop cuando loop=false', () => {
    render(<Carousel initialIndex={2} loop={false}>{slides}</Carousel>)
    
    const nextButton = screen.getByLabelText('Siguiente slide')
    expect(nextButton).toBeDisabled()
  })

  it('auto-play avanza automáticamente', () => {
    vi.useFakeTimers()
    const onChange = vi.fn()
    
    render(<Carousel autoPlay autoPlayInterval={1000} onChange={onChange}>{slides}</Carousel>)
    
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    
    expect(onChange).toHaveBeenCalledWith(1)
    
    vi.useRealTimers()
  })

  it('indica el slide activo en indicadores', () => {
    render(<Carousel initialIndex={1}>{slides}</Carousel>)
    
    const indicators = screen.getAllByRole('tab')
    expect(indicators[1]).toHaveAttribute('aria-selected', 'true')
    expect(indicators[0]).toHaveAttribute('aria-selected', 'false')
  })

  it('tiene atributos de accesibilidad correctos', () => {
    render(<Carousel>{slides}</Carousel>)
    
    expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'Carrusel')
    expect(screen.getAllByRole('group')).toHaveLength(3)
  })
})
