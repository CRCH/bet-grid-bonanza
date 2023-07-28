import { mergeBets } from './mergeBets'

describe('mergeBets', () => {
  test('should correctly merge two bet objects', () => {
    const bet1 = { A1: 10, B1: 20 }
    const bet2 = { A1: 5, B2: 15 }

    const expected = { A1: 15, B1: 20, B2: 15 }

    expect(mergeBets(bet1, bet2)).toEqual(expected)
  })

  test('should correctly merge when second bet object has a new key', () => {
    const bet1 = { A1: 10 }
    const bet2 = { B1: 20 }

    const expected = { A1: 10, B1: 20 }

    expect(mergeBets(bet1, bet2)).toEqual(expected)
  })

  test('should correctly merge when first bet object is empty', () => {
    const bet1 = {}
    const bet2 = { A1: 10, B1: 20 }

    expect(mergeBets(bet1, bet2)).toEqual(bet2)
  })

  test('should correctly merge when both bet objects have the same keys', () => {
    const bet1 = { A1: 10, B1: 20 }
    const bet2 = { A1: 5, B1: 15 }

    const expected = { A1: 15, B1: 35 }

    expect(mergeBets(bet1, bet2)).toEqual(expected)
  })

  test('should correctly handle negative values', () => {
    const bet1 = { A1: 10 }
    const bet2 = { A1: -5 }

    const expected = { A1: 5 }

    expect(mergeBets(bet1, bet2)).toEqual(expected)
  })
})
