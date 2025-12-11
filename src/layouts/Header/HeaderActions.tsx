import type { ReactNode } from 'react'
import { HeaderSearch } from './HeaderSearch'
import { HeaderMenuButton } from './HeaderMenuButton'
import { Icon } from '../../ui'
import { useCart } from '../../context/CartContext'

interface HeaderActionsProps {
  readonly showSearch: boolean
  readonly onSearch?: (query: string) => void
  readonly actions?: ReactNode
  readonly mobileMenuOpen: boolean
  readonly onMenuToggle: () => void
}

export function HeaderActions({
  showSearch,
  onSearch,
  actions,
  mobileMenuOpen,
  onMenuToggle,
}: Readonly<HeaderActionsProps>) {
  const { count } = useCart()

  return (
    <div className="header-actions">
      {showSearch && <HeaderSearch onSearch={onSearch} />}
      
      <div className="header-cart">
        <Icon name="cart" size={24} />
        <span className="header-cart-count">{count}</span>
      </div>

      {actions}
      <HeaderMenuButton isOpen={mobileMenuOpen} onToggle={onMenuToggle} />
    </div>
  )
}

