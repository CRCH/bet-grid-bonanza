import { render } from '@testing-library/react'

import Stats from './Stats'

import GameStore from '@pages/Game/stores/GameStore.store'

describe('Stats', () => {
  beforeEach(() => {
    GameStore.balance = 1000
    GameStore.totalBet = 500
    GameStore.payout = 200
  })
  test('renders without crashing', () => {
    const { container } = render(<Stats />)
    expect(container).toBeInTheDocument()
  })

  test('renders the correct number of StatWrapper components', () => {
    const { getAllByTestId } = render(<Stats />)
    expect(getAllByTestId('stat-wrapper').length).toBe(3)
  })

  test('displays the correct title and value for each stat', () => {
    const expected = [
      { title: 'Balance:', value: '$1,000.00' },
      { title: 'Total bet:', value: '$500.00' },
      { title: 'Last payout:', value: '$200.00' },
    ]
    const { getAllByTestId } = render(<Stats />)

    const statWrappers = getAllByTestId('stat-wrapper')
    statWrappers.forEach((statWrapper, index) => {
      const { title, value } = expected[index]
      expect(statWrapper).toHaveTextContent(title)
      expect(statWrapper).toHaveTextContent(value)
    })
  })
})
