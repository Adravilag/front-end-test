import { useEffect } from 'react'
import { Button, PanelAction, Icon } from '../../ui'
import { useProductDetail } from './hooks'
import { useBreadcrumbContext } from '../../context'
import {
  ProductGallery,
  ProductPricing,
  ProductSpecs,
  RelatedProducts,
  NotFoundState,
} from './components'
import './ProductDetail.css'

export default function ProductDetail() {
  const { 
    product, loading, discount, stockInfo, relatedProducts, specs, goHome,
    selectedColor, setSelectedColor, selectedStorage, setSelectedStorage, handleAddToCart
  } = useProductDetail()
  const { setItems, clearItems } = useBreadcrumbContext()

  // Actualizar breadcrumb cuando el producto carga
  useEffect(() => {
    if (product) {
      setItems([
        { label: 'Inicio', href: '/' },
        { label: product.category, href: `/?category=${product.category}` },
        { label: product.name }
      ])
    }
    return () => clearItems()
  }, [product, setItems, clearItems])

  if (loading) {
    return (
      <div className="product-detail-loading" style={{ textAlign: 'center', padding: '4rem' }}>
        <p>Cargando producto...</p>
      </div>
    )
  }

  if (!product || !discount || !stockInfo) {
    return <NotFoundState onGoHome={goHome} />
  }

  return (
    <div className="product-detail">
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

          {product.options?.colors && product.options.colors.length > 0 && (
            <div className="product-detail-options">
              <h3 className="product-detail-options-title">Color</h3>
              <div className="product-detail-options-group">
                {product.options.colors.map(c => (
                  <button 
                    key={c.code}
                    className={`product-detail-option-btn ${selectedColor === c.code ? 'active' : ''}`}
                    onClick={() => setSelectedColor(c.code)}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.options?.storages && product.options.storages.length > 0 && (
            <div className="product-detail-options">
              <h3 className="product-detail-options-title">Almacenamiento</h3>
              <div className="product-detail-options-group">
                {product.options.storages.map(s => (
                  <button 
                    key={s.code}
                    className={`product-detail-option-btn ${selectedStorage === s.code ? 'active' : ''}`}
                    onClick={() => setSelectedStorage(s.code)}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="product-detail-actions">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              icon={<Icon name="cart-add" size={20} />}
              disabled={product.stock === 'out-of-stock' || !selectedColor || !selectedStorage}
              onClick={handleAddToCart}
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

