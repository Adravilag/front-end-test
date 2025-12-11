import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductById, products } from '../data'
import { ProductCard } from '../components'
import { Button, Icon, PanelAction, Carousel, Image } from '../ui'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const product = id ? getProductById(id) : undefined

  if (!product) {
    return (
      <div className="product-detail-not-found">
        <PanelAction variant="error" title="Producto no encontrado">
          <p>El producto que buscas no existe o ha sido eliminado.</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            <Icon name="home" size={16} />
            Volver al inicio
          </Button>
        </PanelAction>
      </div>
    )
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : 0

  const stockConfig = {
    'in-stock': { label: 'Disponible', variant: 'success' as const },
    'low-stock': { label: 'Últimas unidades', variant: 'warning' as const },
    'out-of-stock': { label: 'Agotado', variant: 'error' as const },
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const specs = Object.entries(product.specs).filter(([, value]) => value)

  return (
    <div className="product-detail">
      {/* Breadcrumb */}
      <nav className="product-detail-breadcrumb">
        <Link to="/">Inicio</Link>
        <Icon name="arrow-right" size={12} />
        <Link to={`/?category=${product.category}`}>{product.category}</Link>
        <Icon name="arrow-right" size={12} />
        <span>{product.name}</span>
      </nav>

      {/* Main Content */}
      <div className="product-detail-main">
        {/* Gallery with Carousel */}
        <div className="product-detail-gallery">
          <Carousel 
            showArrows 
            showIndicators
            width="100%"
            height={500}
          >
            {product.images.map((img, index) => (
              <Image
                key={img}
                src={img}
                alt={`${product.name} - Imagen ${index + 1}`}
                width={600}
                height={600}
              />
            ))}
          </Carousel>
          
          {/* Badges */}
          <div className="product-detail-badges">
            {product.isNew && (
              <span className="product-badge product-badge--new">Nuevo</span>
            )}
            {hasDiscount && (
              <span className="product-badge product-badge--discount">-{discountPercent}%</span>
            )}
            {product.isFeatured && (
              <span className="product-badge product-badge--featured">Destacado</span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="product-detail-info">
          <span className="product-detail-brand">{product.brand}</span>
          <h1 className="product-detail-name">{product.name}</h1>
          
          {/* Price */}
          <div className="product-detail-pricing">
            <span className="product-detail-price">${product.price}</span>
            {hasDiscount && (
              <>
                <span className="product-detail-original-price">${product.originalPrice}</span>
                <span className="product-detail-discount">Ahorras ${product.originalPrice! - product.price}</span>
              </>
            )}
          </div>

          {/* Stock */}
          <PanelAction
            variant={stockConfig[product.stock].variant}
            title={stockConfig[product.stock].label}
            className="product-detail-stock"
          />

          {/* Description */}
          <p className="product-detail-description">{product.description}</p>

          {/* Actions */}
          <div className="product-detail-actions">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={product.stock === 'out-of-stock'}
            >
              {product.stock === 'out-of-stock' ? 'No disponible' : 'Añadir al carrito'}
            </Button>
          </div>

          {/* Specs */}
          {specs.length > 0 && (
            <div className="product-detail-specs">
              <h3 className="product-detail-specs-title">Especificaciones</h3>
              <dl className="product-detail-specs-list">
                {specs.map(([key, value]) => (
                  <div key={key} className="product-detail-spec">
                    <dt>{formatSpecKey(key)}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="product-detail-related">
          <h2 className="product-detail-related-title">Productos relacionados</h2>
          <div className="product-detail-related-grid">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function formatSpecKey(key: string): string {
  const labels: Record<string, string> = {
    screen: 'Pantalla',
    processor: 'Procesador',
    ram: 'Memoria RAM',
    storage: 'Almacenamiento',
    battery: 'Batería',
    camera: 'Cámara',
  }
  return labels[key] || key
}
