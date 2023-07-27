import { roundNumber } from './roundNumber'

describe('roundNumber', () => {
  test('should correctly round positive numbers', () => {
    expect(roundNumber(2.5999999999999996)).toEqual(2.6)
    expect(roundNumber(1.2345678, 3)).toEqual(1.235)
    expect(roundNumber(0.9999999999)).toEqual(1.0)
  })

  test('should correctly round negative numbers', () => {
    expect(roundNumber(-2.5999999999999996)).toEqual(-2.6)
    expect(roundNumber(-1.2345678, 3)).toEqual(-1.235)
    expect(roundNumber(-0.9999999999)).toEqual(-1.0)
  })

  test('should correctly round integers', () => {
    expect(roundNumber(1)).toEqual(1)
    expect(roundNumber(-1)).toEqual(-1)
    expect(roundNumber(0)).toEqual(0)
  })

  test('should return the original number if it is already rounded to the desired number of decimal places', () => {
    expect(roundNumber(1.23, 2)).toEqual(1.23)
    expect(roundNumber(-1.23, 2)).toEqual(-1.23)
    expect(roundNumber(0.5)).toEqual(0.5)
  })
})
