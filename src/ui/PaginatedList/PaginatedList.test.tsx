import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PaginatedGrid } from './PaginatedList'

const mockItems = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
}))

describe('PaginatedGrid', () => {
  it('renders items correctly', () => {
    render(
      <PaginatedGrid
        items={mockItems.slice(0, 5)}
        renderItem={(item) => <div>{item.name}</div>}
        itemsPerPage={12}
      />
    )
    
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 5')).toBeInTheDocument()
  })

  it('shows correct count information', () => {
    const { container } = render(
      <PaginatedGrid
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        itemsPerPage={12}
      />
    )
    
    const countElement = container.querySelector('.paginated-grid-count')
    expect(countElement).toBeInTheDocument()
    expect(countElement?.textContent).toContain('Mostrando')
    expect(countElement?.textContent).toContain('25')
    expect(countElement?.textContent).toContain('elementos')
  })

  it('paginates items correctly', () => {
    render(
      <PaginatedGrid
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        itemsPerPage={12}
      />
    )
    
    // First page should show items 1-12
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 12')).toBeInTheDocument()
    expect(screen.queryByText('Item 13')).not.toBeInTheDocument()
  })

  it('navigates to next page', () => {
    render(
      <PaginatedGrid
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        itemsPerPage={12}
      />
    )
    
    const nextButton = screen.getByLabelText('Página siguiente')
    fireEvent.click(nextButton)
    
    // Second page should show items 13-24
    expect(screen.getByText('Item 13')).toBeInTheDocument()
    expect(screen.getByText('Item 24')).toBeInTheDocument()
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
  })

  it('navigates to previous page', () => {
    render(
      <PaginatedGrid
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        itemsPerPage={12}
      />
    )
    
    // Go to page 2
    const nextButton = screen.getByLabelText('Página siguiente')
    fireEvent.click(nextButton)
    
    // Go back to page 1
    const prevButton = screen.getByLabelText('Página anterior')
    fireEvent.click(prevButton)
    
    expect(screen.getByText('Item 1')).toBeInTheDocument()
  })

  it('disables previous button on first page', () => {
    render(
      <PaginatedGrid
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        itemsPerPage={12}
      />
    )
    
    const prevButton = screen.getByLabelText('Página anterior')
    expect(prevButton).toBeDisabled()
  })

  it('disables next button on last page', () => {
    render(
      <PaginatedGrid
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        itemsPerPage={12}
      />
    )
    
    // Navigate to last page
    const page3Button = screen.getByLabelText('Página 3')
    fireEvent.click(page3Button)
    
    const nextButton = screen.getByLabelText('Página siguiente')
    expect(nextButton).toBeDisabled()
  })

  it('changes items per page', () => {
    render(
      <PaginatedGrid
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        itemsPerPage={12}
        itemsPerPageOptions={[8, 12, 20]}
      />
    )
    
    const select = screen.getByLabelText('Mostrar:')
    fireEvent.change(select, { target: { value: '8' } })
    
    // Should show only 8 items now
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 8')).toBeInTheDocument()
    expect(screen.queryByText('Item 9')).not.toBeInTheDocument()
  })

  it('resets to page 1 when items per page changes', () => {
    render(
      <PaginatedGrid
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        itemsPerPage={12}
        itemsPerPageOptions={[8, 12, 20]}
      />
    )
    
    // Go to page 2
    const nextButton = screen.getByLabelText('Página siguiente')
    fireEvent.click(nextButton)
    
    // Change items per page
    const select = screen.getByLabelText('Mostrar:')
    fireEvent.change(select, { target: { value: '8' } })
    
    // Should be back on page 1
    expect(screen.getByText('Item 1')).toBeInTheDocument()
  })

  it('hides items per page selector when showItemsPerPageSelector is false', () => {
    render(
      <PaginatedGrid
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        itemsPerPage={12}
        showItemsPerPageSelector={false}
      />
    )
    
    expect(screen.queryByLabelText('Mostrar:')).not.toBeInTheDocument()
  })

  it('uses custom items label', () => {
    render(
      <PaginatedGrid
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        itemsPerPage={12}
        itemsLabel="productos"
      />
    )
    
    expect(screen.getByText(/productos/)).toBeInTheDocument()
  })

  it('does not show pagination when items fit on one page', () => {
    render(
      <PaginatedGrid
        items={mockItems.slice(0, 5)}
        renderItem={(item) => <div>{item.name}</div>}
        itemsPerPage={12}
      />
    )
    
    expect(screen.queryByLabelText('Página siguiente')).not.toBeInTheDocument()
  })

  it('handles empty items array', () => {
    render(
      <PaginatedGrid
        items={[]}
        renderItem={(item: { name: string }) => <div>{item.name}</div>}
        itemsPerPage={12}
      />
    )
    
    expect(screen.queryByText('Mostrando')).not.toBeInTheDocument()
  })

  it('navigates using page numbers', () => {
    render(
      <PaginatedGrid
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        itemsPerPage={12}
      />
    )
    
    const page2Button = screen.getByLabelText('Página 2')
    fireEvent.click(page2Button)
    
    expect(screen.getByText('Item 13')).toBeInTheDocument()
  })

  it('applies grid columns class', () => {
    const { container } = render(
      <PaginatedGrid
        items={mockItems.slice(0, 4)}
        renderItem={(item) => <div>{item.name}</div>}
        itemsPerPage={12}
        columns={3}
      />
    )
    
    expect(container.querySelector('.paginated-grid-cols-3')).toBeInTheDocument()
  })
})
