import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface HeaderLogoProps {
  readonly logo?: ReactNode
}

export function HeaderLogo({ logo }: Readonly<HeaderLogoProps>) {
  return (
    <Link to="/" className="header-logo">
      {logo ?? <span className="header-logo-text">Logo</span>}
    </Link>
  )
}
