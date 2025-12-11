import { useState, useCallback, useEffect, type ReactNode, type CSSProperties } from 'react'

export interface CarouselProps {
  /** Items del carrusel */
  children: ReactNode[]
  /** Ancho del carrusel (ej: '100%', '400px', 300) */
  width?: string | number
  /** Alto del carrusel (ej: '300px', 200) */
  height?: string | number
  /** Índice inicial activo */
  initialIndex?: number
  /** Auto-play habilitado */
  autoPlay?: boolean
  /** Intervalo de auto-play en ms */
  autoPlayInterval?: number
  /** Mostrar indicadores de navegación */
  showIndicators?: boolean
  /** Mostrar flechas de navegación */
  showArrows?: boolean
  /** Loop infinito */
  loop?: boolean
  /** Callback cuando cambia el slide */
  onChange?: (index: number) => void
  /** Clase CSS adicional */
  className?: string
  /** Estilos adicionales */
  style?: CSSProperties
}

/**
 * Componente Carousel para mostrar contenido en slides
 * 
 * @example
 * ```tsx
 * <Carousel>
 *   <img src="/slide1.jpg" alt="Slide 1" />
 *   <img src="/slide2.jpg" alt="Slide 2" />
 *   <img src="/slide3.jpg" alt="Slide 3" />
 * </Carousel>
 * 
 * <Carousel autoPlay autoPlayInterval={5000} showIndicators>
 *   {items.map(item => <Card key={item.id}>{item.content}</Card>)}
 * </Carousel>
 * 
 * <Carousel width={400} height={300}>
 *   {products.map(p => <Image key={p.id} src={p.image} alt={p.name} />)}
 * </Carousel>
 * ```
 */
export function Carousel({
  children,
  width,
  height,
  initialIndex = 0,
  autoPlay = false,
  autoPlayInterval = 3000,
  showIndicators = true,
  showArrows = true,
  loop = true,
  onChange,
  className = '',
  style,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const totalSlides = children.length

  const goToSlide = useCallback((index: number) => {
    let newIndex = index
    
    if (loop) {
      if (index < 0) newIndex = totalSlides - 1
      else if (index >= totalSlides) newIndex = 0
    } else {
      if (index < 0) newIndex = 0
      else if (index >= totalSlides) newIndex = totalSlides - 1
    }

    setCurrentIndex(newIndex)
    onChange?.(newIndex)
  }, [totalSlides, loop, onChange])

  const goToPrevious = useCallback(() => {
    goToSlide(currentIndex - 1)
  }, [currentIndex, goToSlide])

  const goToNext = useCallback(() => {
    goToSlide(currentIndex + 1)
  }, [currentIndex, goToSlide])

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(goToNext, autoPlayInterval)
    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, goToNext])

  const canGoPrevious = loop || currentIndex > 0
  const canGoNext = loop || currentIndex < totalSlides - 1

  const carouselStyle: CSSProperties = {
    ...style,
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
  }

  const slideStyle: CSSProperties = {
    ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
  }

  return (
    <div className={`carousel ${className}`} role="region" aria-label="Carrusel" style={carouselStyle}>
      <div className="carousel-container" style={slideStyle}>
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className="carousel-slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} de ${totalSlides}`}
              style={slideStyle}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <>
          <button
            type="button"
            className="carousel-arrow carousel-arrow-prev"
            onClick={goToPrevious}
            disabled={!canGoPrevious}
            aria-label="Slide anterior"
          >
            ‹
          </button>
          <button
            type="button"
            className="carousel-arrow carousel-arrow-next"
            onClick={goToNext}
            disabled={!canGoNext}
            aria-label="Siguiente slide"
          >
            ›
          </button>
        </>
      )}

      {showIndicators && (
        <div className="carousel-indicators" role="tablist">
          {children.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              className={`carousel-indicator ${index === currentIndex ? 'carousel-indicator-active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-selected={index === currentIndex}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Carousel
