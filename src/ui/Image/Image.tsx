import { useState, type ImgHTMLAttributes } from 'react'

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** URL de imagen placeholder cuando falla la carga */
  fallback?: string
}

const DEFAULT_PLACEHOLDER = '/assets/images/product-placeholder.svg'

/**
 * Componente Image con soporte para placeholder cuando la imagen no carga
 * 
 * @example
 * ```tsx
 * <Image src="/photo.jpg" alt="Foto" />
 * <Image src="/photo.jpg" alt="Foto" fallback="/custom-placeholder.svg" />
 * ```
 */
export function Image({
  src,
  alt,
  fallback = DEFAULT_PLACEHOLDER,
  onError,
  ...props
}: ImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(fallback)
    }
    onError?.(e)
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      {...props}
    />
  )
}

export default Image
