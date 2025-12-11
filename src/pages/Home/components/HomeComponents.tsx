import { Icon } from '../../../ui'
import { CATEGORIES, type CategoryFilter as CategoryType } from '../hooks'

export function HeroSection() {
  return (
    <section className="home-hero">
      <div className="home-hero-content">
        <h1 className="home-hero-title">Los mejores dispositivos móviles</h1>
        <p className="home-hero-subtitle">Encuentra smartphones, tablets y accesorios de las mejores marcas</p>
      </div>
    </section>
  )
}

interface CategoryFilterProps {
  readonly categories: typeof CATEGORIES
  readonly activeCategory: CategoryType
  readonly onCategoryChange: (value: string) => void
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="home-categories">
      {categories.map(cat => (
        <button
          key={cat.value}
          className={`home-category-btn${activeCategory === cat.value ? ' home-category-btn--active' : ''}`}
          onClick={() => onCategoryChange(cat.value)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}

export function EmptyState() {
  return (
    <div className="home-products-empty">
      <Icon name="search" size={48} />
      <p>No se encontraron productos</p>
    </div>
  )
}

const getCategoryLabel = (category: CategoryType) =>
  category === 'all' ? 'Todos los productos' : CATEGORIES.find(c => c.value === category)?.label ?? ''

export function ProductsHeader({ category, count }: Readonly<{ category: CategoryType; count: number }>) {
  return (
    <div className="home-products-header">
      <h2 className="home-products-title">{getCategoryLabel(category)}</h2>
      <span className="home-products-count">{count} productos</span>
    </div>
  )
}
