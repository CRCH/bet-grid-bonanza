import { generateFieldData } from './generateGrid'
import { describe, it, expect } from 'vitest'

describe('generateFieldData', () => {
  it('should generate field data for a 5x5 field', () => {
    const fieldData5x5 = generateFieldData(5)

    expect(fieldData5x5).toEqual([
      'A1',
      'B1',
      'C1',
      'D1',
      'E1',
      'A2',
      'B2',
      'C2',
      'D2',
      'E2',
      'A3',
      'B3',
      'C3',
      'D3',
      'E3',
      'A4',
      'B4',
      'C4',
      'D4',
      'E4',
      'A5',
      'B5',
      'C5',
      'D5',
      'E5',
    ])
  })
})
