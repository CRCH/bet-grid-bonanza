import { render, fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'

import Button from './Button'

describe('Button', () => {
  test('renders button with correct text', () => {
    render(<Button appearance="cancel">Cancel</Button>)
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  test('calls onClick prop when clicked', () => {
    const handleClick = vi.fn()
    render(
      <Button appearance="shiny" onClick={handleClick}>
        Click me
      </Button>
    )

    fireEvent.click(screen.getByText(/Click me/i))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
