import { render, screen } from '@testing-library/react'
import Logo from './Logo'

describe('Logo', () => {
  test('renders without crashing', () => {
    render(<Logo />)

    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
  })
})
