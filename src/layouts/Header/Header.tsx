import { useState, useMemo } from 'react'
import type { HeaderProps } from './Header.types'
import { HeaderLogo } from './HeaderLogo'
import { HeaderNav } from './HeaderNav'
import { HeaderActions } from './HeaderActions'
import { Breadcrumb } from '../../ui'

function useHeaderClass(sticky: boolean, className: string): string {
  return useMemo(() => {
    const classes = ['header']
    if (sticky) classes.push('header-sticky')
    if (className) classes.push(className)
    return classes.join(' ')
  }, [sticky, className])
}

export function Header(props: Readonly<HeaderProps>) {
  const {
    logo,
    navItems = [],
    actions,
    sticky = true,
    className = '',
    onMenuClick,
    showSearch = false,
    onSearch,
    breadcrumbItems,
  } = props

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerClass = useHeaderClass(sticky, className)

  const handleMenuToggle = () => {
    setMobileMenuOpen((prev) => !prev)
    onMenuClick?.() // Llama la función de manera segura
  }

  return (
    <header className={headerClass}>
      <div className="header-container">
        <HeaderLogo logo={logo} />
        {breadcrumbItems && breadcrumbItems.length > 0 && (
          <Breadcrumb items={breadcrumbItems} className="header-breadcrumb" />
        )}
        <HeaderNav items={navItems} className="header-nav-desktop" />
        <HeaderActions
          showSearch={showSearch}
          onSearch={onSearch}
          actions={actions}
          mobileMenuOpen={mobileMenuOpen}
          onMenuToggle={handleMenuToggle}
        />
      </div>
      {mobileMenuOpen && <HeaderNav items={navItems} className="header-nav-mobile" />}
    </header>
  )
}
