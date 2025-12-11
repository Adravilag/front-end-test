import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Tamaño del input */
  size?: InputSize
  /** Etiqueta del campo */
  label?: string
  /** Mensaje de error */
  error?: string
  /** Texto de ayuda */
  helperText?: string
  /** Icono a la izquierda */
  leftIcon?: ReactNode
  /** Icono a la derecha */
  rightIcon?: ReactNode
  /** Ocupa todo el ancho disponible */
  fullWidth?: boolean
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'input-sm',
  md: 'input-md',
  lg: 'input-lg',
}

/**
 * Componente Input reutilizable con soporte para etiquetas, errores y iconos
 * 
 * @example
 * ```tsx
 * <Input label="Email" placeholder="tu@email.com" />
 * <Input label="Buscar" leftIcon={<Icon name="search" />} />
 * <Input error="Campo requerido" />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  size = 'md',
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  
  const wrapperClasses = [
    'input-wrapper',
    fullWidth ? 'input-full' : '',
  ].filter(Boolean).join(' ')

  const inputClasses = [
    'input',
    sizeStyles[size],
    error ? 'input-error' : '',
    leftIcon ? 'input-with-left-icon' : '',
    rightIcon ? 'input-with-right-icon' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <div className="input-container">
        {leftIcon && <span className="input-icon-left">{leftIcon}</span>}
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {rightIcon && <span className="input-icon-right">{rightIcon}</span>}
      </div>
      {error && (
        <span id={`${inputId}-error`} className="input-error-text" role="alert">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span id={`${inputId}-helper`} className="input-helper-text">
          {helperText}
        </span>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
