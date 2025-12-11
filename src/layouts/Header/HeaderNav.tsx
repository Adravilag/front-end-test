import { Icon } from '../../ui/Icon'
import type { NavItem } from './Header.types'

interface HeaderNavProps {
  readonly items: readonly NavItem[]
  readonly className?: string
}

export function HeaderNav({ items, className = '' }: Readonly<HeaderNavProps>) {
  return (
    <nav className={`header-nav ${className}`}>
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`header-nav-item ${item.active ? 'header-nav-item-active' : ''}`}
        >
          {item.icon && <Icon name={item.icon} size={18} />}
          {item.label}
        </a>
      ))}
    </nav>
  )
}
