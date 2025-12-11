import type { ReactNode } from 'react'
import { HeaderSearch } from './HeaderSearch'
import { HeaderMenuButton } from './HeaderMenuButton'

interface HeaderActionsProps {
  readonly showSearch: boolean
  readonly onSearch?: (query: string) => void
  readonly actions?: ReactNode
  readonly mobileMenuOpen: boolean
  readonly onMenuToggle: () => void
}

export function HeaderActions({
  showSearch,
  onSearch,
  actions,
  mobileMenuOpen,
  onMenuToggle,
}: Readonly<HeaderActionsProps>) {
  return (
    <div className="header-actions">
      {showSearch && <HeaderSearch onSearch={onSearch} />}
      {actions}
      <HeaderMenuButton isOpen={mobileMenuOpen} onToggle={onMenuToggle} />
    </div>
  )
}
