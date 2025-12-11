import { Link } from 'react-router-dom'
import { Icon, Button, PanelAction, Carousel, Image } from '../../../ui'
import { ProductCard } from '../../../components'
import type { Product } from '../../../data'

const SPEC_LABELS: Record<string, string> = {
  screen: 'Pantalla',
  processor: 'Procesador',
  ram: 'Memoria RAM',
  storage: 'Almacenamiento',
  battery: 'Batería',
  camera: 'Cámara',
  os: 'Sistema Operativo',
  dimensions: 'Dimensiones',
  weight: 'Peso',
}

interface BreadcrumbProps {
  readonly category: string
  readonly productName: string
}

export function Breadcrumb({ category, productName }: Readonly<BreadcrumbProps>) {
  return (
    <nav className="product-detail-breadcrumb">
      <Link to="/">Inicio</Link>
      <Icon name="arrow-right" size={12} />
      <Link to={`/?category=${category}`}>{category}</Link>
      <Icon name="arrow-right" size={12} />
      <span>{productName}</span>
    </nav>
  )
}

interface ProductGalleryProps {
  readonly images: string[]
  readonly productName: string
  readonly isNew?: boolean
  readonly isFeatured?: boolean
  readonly discountPercent?: number
}

export function ProductGallery({ images, productName, isNew, isFeatured, discountPercent }: Readonly<ProductGalleryProps>) {
  return (
    <div className="product-detail-gallery">
      <Carousel showArrows showIndicators width="100%" height={500}>
        {images.map((img, index) => (
          <Image
            key={img}
            src={img}
            alt={`${productName} - Imagen ${index + 1}`}
            width={600}
            height={600}
          />
        ))}
      </Carousel>
      
      <div className="product-detail-badges">
        {isNew && <span className="product-badge product-badge--new">Nuevo</span>}
        {discountPercent && discountPercent > 0 && (
          <span className="product-badge product-badge--discount">-{discountPercent}%</span>
        )}
        {isFeatured && <span className="product-badge product-badge--featured">Destacado</span>}
      </div>
    </div>
  )
}

interface ProductPricingProps {
  readonly price: number
  readonly originalPrice?: number
  readonly savings?: number
}

export function ProductPricing({ price, originalPrice, savings }: Readonly<ProductPricingProps>) {
  return (
    <div className="product-detail-pricing">
      <span className="product-detail-price">{price} €</span>
      {originalPrice && savings && (
        <>
          <span className="product-detail-original-price">{originalPrice} €</span>
          <span className="product-detail-discount">Ahorras {savings} €</span>
        </>
      )}
    </div>
  )
}

interface ProductSpecsProps {
  readonly specs: [string, string | undefined][]
}

export function ProductSpecs({ specs }: Readonly<ProductSpecsProps>) {
  if (specs.length === 0) return null
  
  return (
    <div className="product-detail-specs">
      <h3 className="product-detail-specs-title">Especificaciones</h3>
      <dl className="product-detail-specs-list">
        {specs.map(([key, value]) => (
          <div key={key} className="product-detail-spec">
            <dt>{SPEC_LABELS[key] || key}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

interface RelatedProductsProps {
  readonly products: Product[]
}

export function RelatedProducts({ products }: Readonly<RelatedProductsProps>) {
  if (products.length === 0) return null
  
  return (
    <section className="product-detail-related">
      <h2 className="product-detail-related-title">Productos relacionados</h2>
      <div className="product-detail-related-grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}

interface NotFoundStateProps {
  readonly onGoHome: () => void
}

export function NotFoundState({ onGoHome }: Readonly<NotFoundStateProps>) {
  return (
    <div className="product-detail-not-found">
      <PanelAction variant="error" title="Producto no encontrado">
        <p>El producto que buscas no existe o ha sido eliminado.</p>
        <Button variant="primary" onClick={onGoHome} icon={<Icon name="home" size={16} />}>
          Volver al inicio
        </Button>
      </PanelAction>
    </div>
  )
}
