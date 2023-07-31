import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import BetAmountSelect from './BetAmountSelect'

import GameStore from '@pages/Game/stores/GameStore.store'

describe('BetAmountSelect', () => {
  const mockSetActiveBet = vi.fn()
  const chips = [0.1, 1, 5, 10, 50, 100]

  beforeEach(() => {
    GameStore.gameSettings.chips = chips
    GameStore.gameSettings.setActiveBet = mockSetActiveBet
    render(<BetAmountSelect />)
  })

  it('renders the correct number of chips', () => {
    const chipEls = screen.getAllByTestId('bet-chip')
    expect(chipEls).toHaveLength(chips.length)
  })

  it('calls setActiveBet with the correct value when a chip is clicked', async () => {
    const newBet = 10
    const newBetChip = screen.getByText(`$${newBet}`)
    fireEvent.click(newBetChip)
    expect(mockSetActiveBet).toHaveBeenCalledWith(newBet)
  })
})
