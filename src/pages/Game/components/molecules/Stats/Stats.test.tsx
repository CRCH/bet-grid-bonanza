import { render } from '@testing-library/react'

import Stats from './Stats'

describe('Stats', () => {
  const stats = [
    { id: '1', title: 'Stat 1', value: 'Value 1' },
    { id: '2', title: 'Stat 2', value: 'Value 2' },
    { id: '3', title: 'Stat 3', value: 'Value 3' },
  ]

  test('renders without crashing', () => {
    const { container } = render(<Stats stats={[]} />)
    expect(container).toBeInTheDocument()
  })

  test('renders the correct number of StatWrapper components', () => {
    const { getAllByTestId } = render(<Stats stats={stats} />)
    expect(getAllByTestId('stat-wrapper').length).toBe(stats.length)
  })

  test('displays the correct title and value for each stat', () => {
    const { getAllByTestId } = render(<Stats stats={stats} />)

    const statWrappers = getAllByTestId('stat-wrapper')
    statWrappers.forEach((statWrapper, index) => {
      expect(statWrapper).toHaveTextContent(stats[index].title)
      expect(statWrapper).toHaveTextContent(String(stats[index].value))
    })
  })
})
