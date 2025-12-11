import type { ReactNode } from 'react'
import type { BreadcrumbItem } from '../../ui'

export interface NavItem {
  /** Texto del enlace */
  readonly label: string
  /** URL del enlace */
  readonly href: string
  /** Si el item está activo */
  readonly active?: boolean
  /** Icono opcional */
  readonly icon?: 'home' | 'user' | 'settings' | 'search'
}

export interface HeaderProps {
  /** Logo o título de la aplicación */
  readonly logo?: ReactNode
  /** Elementos de navegación */
  readonly navItems?: readonly NavItem[]
  /** Acciones del lado derecho (botones, iconos) */
  readonly actions?: ReactNode
  /** Sticky en el top */
  readonly sticky?: boolean
  /** Clase CSS adicional */
  readonly className?: string
  /** Mostrar buscador */
  readonly showSearch?: boolean
  /** Callback al buscar */
  readonly onSearch?: (query: string) => void
  /** Items del breadcrumb */
  readonly breadcrumbItems?: BreadcrumbItem[]
}
