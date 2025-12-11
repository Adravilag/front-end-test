import { useState, useMemo, type ReactNode } from 'react'
import { Button } from '../Button'
import { Icon } from '../Icon'
import './PaginatedGrid.css'

export interface PaginatedGridProps<T> {
  /** Items to display in the grid */
  readonly items: T[]
  /** Render function for each item */
  readonly renderItem: (item: T, index: number) => ReactNode
  /** Number of items per page (default: 12) */
  readonly itemsPerPage?: number
  /** Options for items per page selector */
  readonly itemsPerPageOptions?: number[]
  /** Custom className */
  readonly className?: string
  /** Show items per page selector (default: true) */
  readonly showItemsPerPageSelector?: boolean
  /** Label for items (default: 'elementos') */
  readonly itemsLabel?: string
  /** Key extractor for items */
  readonly keyExtractor?: (item: T, index: number) => string | number
  /** Number of columns on desktop (default: 4) */
  readonly columns?: 1 | 2 | 3 | 4 | 5 | 6
}

export function PaginatedGrid<T>({
  items,
  renderItem,
  itemsPerPage: initialItemsPerPage = 12,
  itemsPerPageOptions = [8, 12, 20, 40],
  className = '',
  showItemsPerPageSelector = true,
  itemsLabel = 'elementos',
  keyExtractor = (_, index) => index,
  columns = 4,
}: PaginatedGridProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage)

  const totalItems = items.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return items.slice(startIndex, endIndex)
  }, [items, currentPage, itemsPerPage])

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value)
    setCurrentPage(1)
  }

  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (currentPage > 3) {
        pages.push('ellipsis')
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis')
      }

      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className={`paginated-grid ${className}`.trim()}>
      <div className={`paginated-grid-content paginated-grid-cols-${columns}`}>
        {paginatedItems.map((item, index) => (
          <div key={keyExtractor(item, (currentPage - 1) * itemsPerPage + index)} className="paginated-grid-item">
            {renderItem(item, (currentPage - 1) * itemsPerPage + index)}
          </div>
        ))}
      </div>

      {totalItems > 0 && (
        <div className="paginated-grid-footer">
          <div className="paginated-grid-info">
            <span className="paginated-grid-count">
              Mostrando <strong>{startItem}</strong> - <strong>{endItem}</strong> de <strong>{totalItems}</strong> {itemsLabel}
            </span>

            {showItemsPerPageSelector && (
              <div className="paginated-grid-per-page">
                <label htmlFor="items-per-page">Mostrar:</label>
                <select
                  id="items-per-page"
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                  className="paginated-grid-select"
                >
                  {itemsPerPageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <nav className="paginated-grid-pagination" aria-label="Paginación">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Página anterior"
              >
                <Icon name="arrow-left" size={16} />
              </Button>

              <div className="paginated-grid-pages">
                {getPageNumbers().map((page, index) =>
                  page === 'ellipsis' ? (
                    <span key={`ellipsis-${index}`} className="paginated-grid-ellipsis">
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`paginated-grid-page ${currentPage === page ? 'paginated-grid-page--active' : ''}`}
                      aria-label={`Página ${page}`}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Página siguiente"
              >
                <Icon name="arrow-right" size={16} />
              </Button>
            </nav>
          )}
        </div>
      )}
    </div>
  )
}
