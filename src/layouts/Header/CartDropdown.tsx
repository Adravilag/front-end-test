import { useState } from 'react'
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
  readonly onUpdateQuantity: (index: number, quantity: number) => void
}

function CartItemRow({ item, index, onRemove, onUpdateQuantity }: Readonly<CartItemRowProps>) {
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onRemove(index)
  }

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onUpdateQuantity(index, item.quantity - 1)
  }

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onUpdateQuantity(index, item.quantity + 1)
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
          <span className="cart-dropdown-item-price">{item.productPrice * item.quantity} €</span>
        </div>
      </Link>
      <div className="cart-dropdown-item-actions">
        <div className="cart-dropdown-quantity">
          <button 
            className="cart-dropdown-quantity-btn"
            onClick={handleDecrement}
            title="Reducir cantidad"
          >
            <Icon name="minus" size={14} />
          </button>
          <span className="cart-dropdown-quantity-value">{item.quantity}</span>
          <button 
            className="cart-dropdown-quantity-btn"
            onClick={handleIncrement}
            title="Aumentar cantidad"
          >
            <Icon name="plus" size={14} />
          </button>
        </div>
        <button 
          className="cart-dropdown-item-remove" 
          onClick={handleRemove}
          title="Eliminar"
        >
          <Icon name="close" size={14} />
        </button>
      </div>
    </div>
  )
}

export function CartDropdown({ isOpen, onClose }: Readonly<CartDropdownProps>) {
  const { items, count, removeItem, updateQuantity, clearCart } = useCart()
  const [showConfirmClear, setShowConfirmClear] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  if (!isOpen) return null

  const total = items.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0)

  const handleClearCart = () => {
    setShowConfirmClear(true)
  }

  const confirmClearCart = () => {
    clearCart()
    setShowConfirmClear(false)
  }

  const cancelClearCart = () => {
    setShowConfirmClear(false)
  }

  const handleCheckout = () => {
    setIsProcessingPayment(true)
    
    // Simular procesamiento de pago
    setTimeout(() => {
      setIsProcessingPayment(false)
      setPaymentSuccess(true)
      
      // Mostrar mensaje de éxito y limpiar carrito
      setTimeout(() => {
        clearCart()
        setPaymentSuccess(false)
        onClose()
      }, 2000)
    }, 1500)
  }

  return (
    <>
      <div className="cart-dropdown-overlay" onClick={onClose} />
      <div className="cart-dropdown">
        <div className="cart-dropdown-header">
          <h3>Carrito ({count})</h3>
          {items.length > 0 && (
            <button 
              className="cart-dropdown-clear" 
              onClick={handleClearCart}
              title="Vaciar carrito"
            >
              <Icon name="close" size={16} />
            </button>
          )}
        </div>

        {showConfirmClear && (
          <div className="cart-dropdown-confirm">
            <p>¿Vaciar el carrito?</p>
            <div className="cart-dropdown-confirm-actions">
              <button className="cart-dropdown-confirm-cancel" onClick={cancelClearCart}>
                Cancelar
              </button>
              <button className="cart-dropdown-confirm-ok" onClick={confirmClearCart}>
                Vaciar
              </button>
            </div>
          </div>
        )}

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
                  key={`${item.productId}-${item.colorCode}-${item.storageCode}`} 
                  item={item} 
                  index={index}
                  onRemove={removeItem}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-dropdown-footer">
            <div className="cart-dropdown-total">
              <span>Total</span>
              <span className="cart-dropdown-total-price">{total} €</span>
            </div>
            <button 
              className="cart-dropdown-checkout"
              onClick={handleCheckout}
              disabled={isProcessingPayment || paymentSuccess}
            >
              {isProcessingPayment ? (
                <>
                  <span className="cart-dropdown-spinner" />
                  Procesando...
                </>
              ) : paymentSuccess ? (
                <>
                  <Icon name="check" size={18} />
                  ¡Pago completado!
                </>
              ) : (
                'Finalizar compra'
              )}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
