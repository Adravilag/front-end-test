import { Link } from 'react-router-dom'
import { Icon } from '../Icon'
import './Breadcrumb.css'

export interface BreadcrumbItem {
  readonly label: string
  readonly href?: string
}

export interface BreadcrumbProps {
  readonly items: BreadcrumbItem[]
  readonly separator?: 'arrow' | 'slash'
  readonly className?: string
}

export function Breadcrumb({ 
  items, 
  separator = 'arrow',
  className = '' 
}: Readonly<BreadcrumbProps>) {
  if (items.length === 0) return null

  return (
    <nav className={`breadcrumb ${className}`.trim()} aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          
          return (
            <li key={`${item.label}-${index}`} className="breadcrumb-item">
              {item.href && !isLast ? (
                <Link to={item.href} className="breadcrumb-link">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'breadcrumb-current' : 'breadcrumb-text'} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              
              {!isLast && (
                <span className="breadcrumb-separator" aria-hidden="true">
                  {separator === 'arrow' ? (
                    <Icon name="arrow-right" size={12} />
                  ) : (
                    '/'
                  )}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
