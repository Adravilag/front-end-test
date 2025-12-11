import type { HTMLAttributes, ReactNode } from 'react'

export type CardVariant = 'default' | 'outlined' | 'elevated'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Variante visual de la tarjeta */
  variant?: CardVariant
  /** Contenido del header */
  header?: ReactNode
  /** Contenido del footer */
  footer?: ReactNode
  /** Imagen de la tarjeta */
  image?: string
  /** Alt de la imagen */
  imageAlt?: string
  /** Sin padding interno */
  noPadding?: boolean
  /** Contenido principal */
  children: ReactNode
}

const variantStyles: Record<CardVariant, string> = {
  default: 'card-default',
  outlined: 'card-outlined',
  elevated: 'card-elevated',
}

/**
 * Componente Card para agrupar contenido relacionado
 * 
 * @example
 * ```tsx
 * <Card>Contenido simple</Card>
 * <Card header={<h3>Título</h3>} footer={<Button>Acción</Button>}>
 *   Contenido de la tarjeta
 * </Card>
 * <Card image="/photo.jpg" imageAlt="Descripción">
 *   Tarjeta con imagen
 * </Card>
 * ```
 */
export function Card({
  variant = 'default',
  header,
  footer,
  image,
  imageAlt = '',
  noPadding = false,
  children,
  className = '',
  ...props
}: CardProps) {
  const classes = [
    'card',
    variantStyles[variant],
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      {image && (
        <div className="card-image">
          <img src={image} alt={imageAlt} />
        </div>
      )}
      {header && <div className="card-header">{header}</div>}
      <div className={`card-body ${noPadding ? 'card-body-no-padding' : ''}`}>
        {children}
      </div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}

export default Card
