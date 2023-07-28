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
    const { getByText } = render(
      <BetCell id="1" placeBet={placeBet} balance={20} bet={bet} multiplier={2} getMultipliedBalance={40} />
    )
    expect(getByText('1')).toBeInTheDocument()
  })

  test('displays the correct cell balance', () => {
    const { getByText } = render(
      <BetCell id="1" placeBet={placeBet} balance={20} bet={bet} multiplier={0} getMultipliedBalance={20} />
    )
    expect(getByText('$20.00')).toBeInTheDocument()
  })

  test('displays the correct multiplier', async () => {
    const { getByText } = render(
      <BetCell id="1" placeBet={placeBet} balance={20} bet={bet} multiplier={2} getMultipliedBalance={40} />
    )
    expect(getByText('x2')).toBeInTheDocument()
  })

  test('calls placeBet with correct value on click', () => {
    const { getByText } = render(
      <BetCell id="1" placeBet={placeBet} balance={20} bet={bet} multiplier={2} getMultipliedBalance={40} />
    )
    fireEvent.click(getByText('1'))
    expect(placeBet).toHaveBeenCalledWith(bet)
  })
})
