import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visual del botón */
  variant?: ButtonVariant
  /** Tamaño del botón */
  size?: ButtonSize
  /** Contenido del botón */
  children: ReactNode
  /** Estado de carga */
  loading?: boolean
  /** Icono a la izquierda */
  leftIcon?: ReactNode
  /** Icono a la derecha */
  rightIcon?: ReactNode
  /** Ocupa todo el ancho disponible */
  fullWidth?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
}

/**
 * Componente Button reutilizable
 * 
 * @example
 * ```tsx
 * <Button variant="primary">Click me</Button>
 * <Button variant="outline" size="lg" leftIcon={<Icon name="search" />}>Buscar</Button>
 * <Button loading>Guardando...</Button>
 * ```
 */
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const classes = [
    'btn',
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? 'btn-full' : '',
    loading ? 'btn-loading' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="btn-spinner" aria-hidden="true" />}
      {!loading && leftIcon && <span className="btn-icon-left">{leftIcon}</span>}
      <span className="btn-content">{children}</span>
      {!loading && rightIcon && <span className="btn-icon-right">{rightIcon}</span>}
    </button>
  )
}

export default Button
