import type { SVGProps } from 'react'

// Tipos de iconos disponibles en el sprite
export const ICON_NAMES = [
  'home',
  'arrow-left',
  'arrow-right',
  'search',
  'close',
  'menu',
  'user',
  'settings',
  'bag',
  'cart',
  'cart-add',
  'info',
  'alert',
  'error',
  'check',
  'plus',
  'minus',
] as const

export type IconName = (typeof ICON_NAMES)[number]

export interface IconProps extends SVGProps<SVGSVGElement> {
  /** Nombre del icono del sprite */
  name: IconName
  /** Tamaño del icono en píxeles (default: 24) */
  size?: number
  /** Título accesible para el icono */
  title?: string
}

/**
 * Componente Icon que renderiza iconos SVG desde el sprite
 * 
 * @example
 * ```tsx
 * <Icon name="home" />
 * <Icon name="search" size={32} className="text-blue-500" />
 * <Icon name="user" title="Perfil de usuario" />
 * ```
 */
export function Icon({
  name,
  size = 24,
  title,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      aria-hidden={!title}
      role={title ? 'img' : undefined}
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <use href={`/sprite.svg#icon-${name}`} />
    </svg>
  )
}

export default Icon
