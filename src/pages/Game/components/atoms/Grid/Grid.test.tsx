import { render } from '@testing-library/react'

import Grid from './Grid'

describe('<Grid />', () => {
  test('renders without crashing', () => {
    render(
      <Grid size={3}>
        <div />
      </Grid>
    )
  })

  test('renders its children', () => {
    const { getByText } = render(
      <Grid size={3}>
        <div>Test Child</div>
      </Grid>
    )
    expect(getByText('Test Child')).toBeInTheDocument()
  })
})
