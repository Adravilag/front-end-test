import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import { Breadcrumb } from './Breadcrumb'

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('Breadcrumb', () => {
  it('renders nothing when items array is empty', () => {
    const { container } = renderWithRouter(<Breadcrumb items={[]} />)
    expect(container.querySelector('nav')).toBeNull()
  })

  it('renders single item without separator', () => {
    renderWithRouter(<Breadcrumb items={[{ label: 'Home' }]} />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.queryByRole('img')).toBeNull()
  })

  it('renders multiple items with separators', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Phone' }
    ]
    
    renderWithRouter(<Breadcrumb items={items} />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Phone')).toBeInTheDocument()
  })

  it('renders links for items with href except last item', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Phone', href: '/phone' }
    ]
    
    renderWithRouter(<Breadcrumb items={items} />)
    
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2) // Last item should not be a link
    expect(links[0]).toHaveAttribute('href', '/')
    expect(links[1]).toHaveAttribute('href', '/products')
  })

  it('marks last item as current page', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Phone' }
    ]
    
    renderWithRouter(<Breadcrumb items={items} />)
    
    const currentItem = screen.getByText('Phone')
    expect(currentItem).toHaveAttribute('aria-current', 'page')
  })

  it('applies custom className', () => {
    renderWithRouter(
      <Breadcrumb 
        items={[{ label: 'Home' }]} 
        className="custom-breadcrumb" 
      />
    )
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('breadcrumb', 'custom-breadcrumb')
  })

  it('uses slash separator when specified', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Phone' }
    ]
    
    renderWithRouter(<Breadcrumb items={items} separator="slash" />)
    
    expect(screen.getByText('/')).toBeInTheDocument()
  })

  it('has accessible navigation label', () => {
    renderWithRouter(<Breadcrumb items={[{ label: 'Home' }]} />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb')
  })
})
