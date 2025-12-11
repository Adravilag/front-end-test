import type { ReactNode } from 'react'

interface HeaderLogoProps {
  readonly logo?: ReactNode
}

export function HeaderLogo({ logo }: Readonly<HeaderLogoProps>) {
  return (
    <div className="header-logo">
      {logo ?? <span className="header-logo-text">Logo</span>}
    </div>
  )
}
