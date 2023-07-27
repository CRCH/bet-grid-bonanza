import { ButtonStyles } from './Button.styles'

type ButtonAppearance = 'primary' | 'cancel' | 'shiny'

interface ButtonProps {
  appearance: ButtonAppearance
  onClick?: () => void
  children: React.ReactNode
  disabled?: boolean
}

const Button = ({ appearance, onClick, children, disabled }: ButtonProps): React.ReactElement => {
  const ButtonComponent = ButtonStyles[appearance]

  return (
    <ButtonComponent disabled={disabled} onClick={onClick}>
      {children}
    </ButtonComponent>
  )
}

export default Button
