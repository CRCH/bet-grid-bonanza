import { render, fireEvent } from '@testing-library/react'
import { Mock, vi } from 'vitest'

import BetCell from './BetCell'

vi.useFakeTimers()

describe('BetCell', () => {
  let placeBet: Mock
  const bet = 10

  beforeEach(() => {
    placeBet = vi.fn()
  })

  test('renders without crashing', () => {
    const { getByText } = render(<BetCell id="1" placeBet={placeBet} cellBalance={20} bet={bet} multiplier={2} />)
    expect(getByText('1')).toBeInTheDocument()
  })

  test('displays the correct cell balance', () => {
    const { getByText } = render(<BetCell id="1" placeBet={placeBet} cellBalance={20} bet={bet} multiplier={0} />)
    expect(getByText('20$')).toBeInTheDocument()
  })

  test('does not display the cell balance when multiplier is set', () => {
    const { queryByText } = render(<BetCell id="1" placeBet={placeBet} cellBalance={20} bet={bet} multiplier={2} />)
    expect(queryByText('20$')).not.toBeInTheDocument()
  })

  test('displays the correct multiplier', async () => {
    const { getByText } = render(<BetCell id="1" placeBet={placeBet} cellBalance={20} bet={bet} multiplier={2} />)
    expect(getByText('x2')).toBeInTheDocument()
  })

  test('calls placeBet with correct value on click', () => {
    const { getByText } = render(<BetCell id="1" placeBet={placeBet} cellBalance={20} bet={bet} multiplier={2} />)
    fireEvent.click(getByText('1'))
    expect(placeBet).toHaveBeenCalledWith(bet)
  })
})
