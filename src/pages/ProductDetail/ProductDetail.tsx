import { Button, PanelAction } from '../../ui'
import { useProductDetail } from './hooks'
import {
  Breadcrumb,
  ProductGallery,
  ProductPricing,
  ProductSpecs,
  RelatedProducts,
  NotFoundState,
} from './components'
import './ProductDetail.css'

export default function ProductDetail() {
  const { product, discount, stockInfo, relatedProducts, specs, goHome } = useProductDetail()

  if (!product || !discount || !stockInfo) {
    return <NotFoundState onGoHome={goHome} />
  }

  return (
    <div className="product-detail">
      <Breadcrumb category={product.category} productName={product.name} />

      <div className="product-detail-main">
        <ProductGallery
          images={product.images}
          productName={product.name}
          isNew={product.isNew}
          isFeatured={product.isFeatured}
          discountPercent={discount.hasDiscount ? discount.percent : undefined}
        />

        <div className="product-detail-info">
          <span className="product-detail-brand">{product.brand}</span>
          <h1 className="product-detail-name">{product.name}</h1>
          
          <ProductPricing
            price={product.price}
            originalPrice={discount.hasDiscount ? product.originalPrice : undefined}
            savings={discount.hasDiscount ? discount.savings : undefined}
          />

          <PanelAction
            variant={stockInfo.variant}
            title={stockInfo.label}
            className="product-detail-stock"
          />

          <p className="product-detail-description">{product.description}</p>

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

          <ProductSpecs specs={specs} />
        </div>
      </div>

      <RelatedProducts products={relatedProducts} />
    </div>
  )
}
