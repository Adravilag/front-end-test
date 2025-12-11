import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('devuelve el valor inicial inmediatamente', () => {
    const { result } = renderHook(() => useDebounce('initial', 300))
    expect(result.current).toBe('initial')
  })

  it('no actualiza el valor antes del delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'initial' } }
    )

    rerender({ value: 'updated' })
    
    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(result.current).toBe('initial')
  })

  it('actualiza el valor después del delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'initial' } }
    )

    rerender({ value: 'updated' })
    
    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current).toBe('updated')
  })

  it('cancela actualizaciones previas cuando el valor cambia rápidamente', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'first' } }
    )

    rerender({ value: 'second' })
    act(() => vi.advanceTimersByTime(100))
    
    rerender({ value: 'third' })
    act(() => vi.advanceTimersByTime(100))
    
    rerender({ value: 'final' })
    act(() => vi.advanceTimersByTime(300))

    expect(result.current).toBe('final')
  })

  it('usa el delay por defecto de 300ms', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value),
      { initialProps: { value: 'initial' } }
    )

    rerender({ value: 'updated' })
    
    act(() => vi.advanceTimersByTime(299))
    expect(result.current).toBe('initial')
    
    act(() => vi.advanceTimersByTime(1))
    expect(result.current).toBe('updated')
  })
})
