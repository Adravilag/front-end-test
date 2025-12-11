import { Link } from 'react-router-dom'
import type { Product } from '../../data'
import { Card, Image } from '../../ui'
import './ProductCard.css'

interface ProductCardProps {
  readonly product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : 0

  const stockLabel = {
    'in-stock': 'Disponible',
    'low-stock': 'Últimas unidades',
    'out-of-stock': 'Agotado',
  }

  return (
    <Card variant="elevated" className="product-card">
      <Link to={`/producto/${product.id}`} className="product-card-link">
        <div className="product-card-image">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
          />
          
          {/* Badges */}
          <div className="product-card-badges">
            {product.isNew && (
              <span className="product-badge product-badge--new">Nuevo</span>
            )}
            {hasDiscount && (
              <span className="product-badge product-badge--discount">-{discountPercent}%</span>
            )}
          </div>
        </div>

        <div className="product-card-content">
          <span className="product-card-brand">{product.brand}</span>
          <h3 className="product-card-name">{product.name}</h3>
          
          <div className="product-card-pricing">
            <span className="product-card-price">{product.price} €</span>
            {hasDiscount && (
              <span className="product-card-original-price">{product.originalPrice} €</span>
            )}
          </div>

          <span className={`product-card-stock product-card-stock--${product.stock}`}>
            {stockLabel[product.stock]}
          </span>
        </div>
      </Link>
    </Card>
  )
}
