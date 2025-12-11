import { useMemo } from 'react'
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
    showSearch = false,
    onSearch,
    breadcrumbItems,
  } = props

  const headerClass = useHeaderClass(sticky, className)

  return (
    <header className={headerClass}>
      <div className="header-container">
        <div className="header-left">
          <HeaderLogo logo={logo} />
          {breadcrumbItems && breadcrumbItems.length > 0 && (
            <Breadcrumb items={breadcrumbItems} className="header-breadcrumb" />
          )}
        </div>
        <HeaderNav items={navItems} className="header-nav-desktop" />
        <HeaderActions
          showSearch={showSearch}
          onSearch={onSearch}
          actions={actions}
        />
      </div>
      {breadcrumbItems && breadcrumbItems.length > 0 && (
        <div className="header-breadcrumb-mobile">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      )}
    </header>
  )
}
