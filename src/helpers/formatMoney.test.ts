import { formatMoney } from './formatMoney'

describe('formatMoney function', () => {
  test('should format a number to USD format', () => {
    expect(formatMoney(1234.56)).toEqual('$1,234.56')
  })

  test('should handle negative numbers', () => {
    expect(formatMoney(-1234.56)).toEqual('-$1,234.56')
  })

  test('should handle zero', () => {
    expect(formatMoney(0)).toEqual('$0.00')
  })

  test('should round to two decimal places', () => {
    expect(formatMoney(1234.567)).toEqual('$1,234.57')
  })
})
