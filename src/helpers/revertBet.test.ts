import { revertBet } from './revertBet'

describe('revertBet', () => {
  test('should return an object with the same keys but negative values', () => {
    const bet = { A1: 10, B1: 20, C1: 30 }
    const expected = { A1: -10, B1: -20, C1: -30 }

    expect(revertBet(bet)).toEqual(expected)
  })

  test('should correctly handle an empty bet object', () => {
    const bet = {}
    const expected = {}

    expect(revertBet(bet)).toEqual(expected)
  })
})
