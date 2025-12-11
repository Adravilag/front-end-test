import { ProductCard } from '../../components'
import { Input, Icon } from '../../ui'
import { HeroSection, CategoryFilter, EmptyState, ProductsHeader } from './components'
import { useProductFilters, CATEGORIES, type CategoryFilter as CategoryType } from './hooks'
import './Home.css'

export default function Home() {
  const { search, category, filteredProducts, setSearch, setCategory } = useProductFilters()

  return (
    <div className="home">
      <HeroSection />

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
          
          <CategoryFilter
            categories={CATEGORIES}
            activeCategory={category}
            onCategoryChange={(v) => setCategory(v as CategoryType)}
          />
        </div>
      </section>

      <section className="home-products">
        <ProductsHeader category={category} count={filteredProducts.length} />

        {filteredProducts.length > 0 ? (
          <div className="home-products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>
    </div>
  )
}
