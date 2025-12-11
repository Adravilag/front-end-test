import { ProductCard } from '../../components'
import { Input, Icon, PaginatedGrid } from '../../ui'
import { HeroSection, CategoryFilter, EmptyState } from './components'
import { useProductFilters, CATEGORIES, type CategoryFilter as CategoryType } from './hooks'
import './Home.css'

export default function Home() {
  const { search, category, filteredProducts, setSearch, setCategory, loading } = useProductFilters()

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
        {loading ? (
          <div className="home-loading" style={{ textAlign: 'center', padding: '4rem' }}>
            <p>Cargando productos...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <PaginatedGrid
            items={filteredProducts}
            renderItem={(product) => <ProductCard product={product} />}
            keyExtractor={(product) => product.id}
            itemsPerPage={12}
            columns={4}
            itemsLabel="productos"
          />
        ) : (
          <EmptyState />
        )}
      </section>
    </div>
  )
}
