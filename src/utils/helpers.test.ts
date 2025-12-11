import { describe, it, expect } from 'vitest'
import { sum, capitalize, formatPrice, isValidEmail, truncate } from './helpers'

describe('sum', () => {
  it('suma dos números positivos', () => {
    expect(sum(2, 3)).toBe(5)
  })

  it('suma números negativos', () => {
    expect(sum(-1, -2)).toBe(-3)
  })

  it('suma con cero', () => {
    expect(sum(5, 0)).toBe(5)
  })
})

describe('capitalize', () => {
  it('capitaliza la primera letra', () => {
    expect(capitalize('hola')).toBe('Hola')
  })

  it('convierte el resto a minúsculas', () => {
    expect(capitalize('HOLA')).toBe('Hola')
  })

  it('retorna string vacío si no hay input', () => {
    expect(capitalize('')).toBe('')
    expect(capitalize(null)).toBe('')
  })
})

describe('formatPrice', () => {
  it('formatea precio en EUR por defecto', () => {
    const result = formatPrice(1234.56)
    expect(result).toContain('€')
  })

  it('formatea precio en USD', () => {
    const result = formatPrice(1234.56, 'USD')
    expect(result).toContain('US$')
  })
})

describe('isValidEmail', () => {
  it('valida email correcto', () => {
    expect(isValidEmail('test@example.com')).toBe(true)
    expect(isValidEmail('user.name@domain.org')).toBe(true)
  })

  it('rechaza email inválido', () => {
    expect(isValidEmail('invalid')).toBe(false)
    expect(isValidEmail('test@')).toBe(false)
    expect(isValidEmail('@domain.com')).toBe(false)
    expect(isValidEmail('test @domain.com')).toBe(false)
  })
})

describe('truncate', () => {
  it('trunca texto largo', () => {
    const text = 'Este es un texto muy largo que necesita ser truncado'
    expect(truncate(text, 10)).toBe('Este es un...')
  })

  it('no trunca texto corto', () => {
    expect(truncate('Hola', 10)).toBe('Hola')
  })

  it('maneja texto vacío', () => {
    expect(truncate('')).toBe('')
    expect(truncate(null)).toBe(null)
  })
})
