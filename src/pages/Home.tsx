import { useState } from 'react'
import { products, type Product } from '../data'
import { ProductCard } from '../components'
import { Input, Icon } from '../ui'
import './Home.css'

type CategoryFilter = 'all' | Product['category']

export default function Home() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<CategoryFilter>('all')

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                         product.brand.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'all' || product.category === category
    return matchesSearch && matchesCategory
  })

  const categories: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: 'smartphones', label: 'Smartphones' },
    { value: 'tablets', label: 'Tablets' },
    { value: 'accesorios', label: 'Accesorios' },
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-content">
          <h1 className="home-hero-title">
            Los mejores dispositivos móviles
          </h1>
          <p className="home-hero-subtitle">
            Encuentra smartphones, tablets y accesorios de las mejores marcas
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="home-filters">
        <div className="home-filters-container">
          <div className="home-search">
            <Input
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Icon name="search" size={18} />}
              size="md"
            />
          </div>
          
          <div className="home-categories">
            {categories.map(cat => (
              <button
                key={cat.value}
                className={`home-category-btn ${category === cat.value ? 'home-category-btn--active' : ''}`}
                onClick={() => setCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="home-products">
        <div className="home-products-header">
          <h2 className="home-products-title">
            {category === 'all' ? 'Todos los productos' : categories.find(c => c.value === category)?.label}
          </h2>
          <span className="home-products-count">
            {filteredProducts.length} productos
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="home-products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="home-products-empty">
            <Icon name="search" size={48} />
            <p>No se encontraron productos</p>
          </div>
        )}
      </section>
    </div>
  )
}
