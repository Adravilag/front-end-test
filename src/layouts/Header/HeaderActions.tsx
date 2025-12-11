import { useState, type ReactNode } from 'react'
import { HeaderSearch } from './HeaderSearch'
import { HeaderMenuButton } from './HeaderMenuButton'
import { CartDropdown } from './CartDropdown'
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
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <div className="header-actions">
      {showSearch && <HeaderSearch onSearch={onSearch} />}
      
      <div className="header-cart-wrapper">
        <button 
          className="header-cart" 
          onClick={() => setCartOpen(!cartOpen)}
          aria-label="Ver carrito"
        >
          <Icon name="cart" size={24} />
          <span className="header-cart-count">{count}</span>
        </button>
        
        <CartDropdown isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </div>

      {actions}
      <HeaderMenuButton isOpen={mobileMenuOpen} onToggle={onMenuToggle} />
    </div>
  )
}

