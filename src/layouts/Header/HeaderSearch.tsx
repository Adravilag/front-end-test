import { useState } from 'react'
import { Icon } from '../../ui/Icon'

interface HeaderSearchProps {
  readonly onSearch?: (query: string) => void
}

export function HeaderSearch({ onSearch }: HeaderSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
  }

  if (!isOpen) {
    return (
      <button
        className="header-icon-button"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir búsqueda"
      >
        <Icon name="search" size={20} />
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="header-search-form">
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="header-search-input"
        autoFocus
      />
      <button
        type="button"
        className="header-search-close"
        onClick={() => setIsOpen(false)}
        aria-label="Cerrar búsqueda"
      >
        <Icon name="close" size={20} />
      </button>
    </form>
  )
}
