import { Mocked, vi } from 'vitest'

import { GameStore } from './GameStore.store'
import FieldCell from './FieldCellStore.store'

vi.mock('mobx', () => ({
  makeAutoObservable: vi.fn(),
}))

vi.mock('./GameStore.store', () => ({
  GameStore: vi.fn(),
}))

describe('FieldCell', () => {
  let mockGameStore: Mocked<GameStore>

  beforeEach(() => {
    mockGameStore = new GameStore() as Mocked<GameStore>
    mockGameStore.placeBet = vi.fn().mockImplementation(() => true)
  })

  test('should call GameStore.placeBet and increase cellBalance when placeBet is called', () => {
    const fieldCell = new FieldCell(mockGameStore, '1')

    fieldCell.placeBet(10)
    expect(mockGameStore.placeBet).toHaveBeenCalledWith('1', 10)
    expect(fieldCell.balance).toBe(10)
  })
})
