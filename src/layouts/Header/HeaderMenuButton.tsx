import { Icon } from '../../ui/Icon'

interface HeaderMenuButtonProps {
  readonly isOpen: boolean
  readonly onToggle: () => void
}

export function HeaderMenuButton({ isOpen, onToggle }: HeaderMenuButtonProps) {
  return (
    <button
      className="header-menu-button"
      onClick={onToggle}
      aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      aria-expanded={isOpen}
    >
      <Icon name={isOpen ? 'close' : 'menu'} size={24} />
    </button>
  )
}
