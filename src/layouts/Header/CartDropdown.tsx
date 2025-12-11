import { Link } from 'react-router-dom'
import { useCart, type CartItem } from '../../context/CartContext'
import { Icon } from '../../ui'
import './CartDropdown.css'

interface CartDropdownProps {
  readonly isOpen: boolean
  readonly onClose: () => void
}

interface CartItemRowProps {
  readonly item: CartItem
  readonly index: number
  readonly onRemove: (index: number) => void
}

function CartItemRow({ item, index, onRemove }: Readonly<CartItemRowProps>) {
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onRemove(index)
  }

  return (
    <div className="cart-dropdown-item">
      <Link 
        to={`/producto/${item.productId}`} 
        className="cart-dropdown-item-link"
      >
        <img 
          src={item.productImage} 
          alt={item.productName} 
          className="cart-dropdown-item-image"
        />
        <div className="cart-dropdown-item-info">
          <span className="cart-dropdown-item-name">{item.productName}</span>
          <span className="cart-dropdown-item-options">
            {item.colorName} · {item.storageName}
          </span>
          <span className="cart-dropdown-item-price">${item.productPrice}</span>
        </div>
      </Link>
      <button 
        className="cart-dropdown-item-remove" 
        onClick={handleRemove}
        title="Eliminar"
      >
        <Icon name="close" size={14} />
      </button>
    </div>
  )
}

export function CartDropdown({ isOpen, onClose }: Readonly<CartDropdownProps>) {
  const { items, count, removeItem, clearCart } = useCart()

  if (!isOpen) return null

  const total = items.reduce((sum, item) => sum + item.productPrice, 0)

  return (
    <>
      <div className="cart-dropdown-overlay" onClick={onClose} />
      <div className="cart-dropdown">
        <div className="cart-dropdown-header">
          <h3>Carrito ({count})</h3>
          {items.length > 0 && (
            <button 
              className="cart-dropdown-clear" 
              onClick={clearCart}
              title="Vaciar carrito"
            >
              <Icon name="close" size={16} />
            </button>
          )}
        </div>

        <div className="cart-dropdown-content">
          {items.length === 0 ? (
            <div className="cart-dropdown-empty">
              <Icon name="cart" size={48} />
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="cart-dropdown-items">
              {items.map((item, index) => (
                <CartItemRow 
                  key={`${item.productId}-${item.addedAt}-${index}`} 
                  item={item} 
                  index={index}
                  onRemove={removeItem}
                />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-dropdown-footer">
            <div className="cart-dropdown-total">
              <span>Total</span>
              <span className="cart-dropdown-total-price">${total}</span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
