import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './pages/Home'

describe('Home', () => {
  it('renderiza el título', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
  })
})
