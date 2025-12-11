/**
 * Suma dos números
 */
export function sum(a: number, b: number): number {
  return a + b
}

/**
 * Capitaliza la primera letra de un string
 */
export function capitalize(str: string | null): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Formatea un precio con símbolo de moneda
 */
export function formatPrice(amount: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency
  }).format(amount)
}

/**
 * Valida formato de email
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Trunca un texto a X caracteres
 */
export function truncate(text: string | null, maxLength: number = 50): string | null {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
