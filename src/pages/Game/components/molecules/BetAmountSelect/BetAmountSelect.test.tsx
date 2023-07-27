import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import BetAmountSelect from './BetAmountSelect'

describe('BetAmountSelect', () => {
  const mockSetActiveBet = vi.fn()
  const chips = [0.1, 1, 5, 10, 50, 100]
  const activeBet = 5

  beforeEach(() => {
    render(<BetAmountSelect chips={chips} setActiveBet={mockSetActiveBet} activeBet={activeBet} />)
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
