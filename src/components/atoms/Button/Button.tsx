import { ButtonStyles } from './Button.styles'

type ButtonAppearance = 'primary' | 'cancel' | 'shiny'

interface ButtonProps {
  appearance: ButtonAppearance
  onClick?: () => void
  children: React.ReactNode
}

const Button = ({ appearance, onClick, children }: ButtonProps): React.ReactElement => {
  const ButtonComponent = ButtonStyles[appearance]

  return <ButtonComponent onClick={onClick}>{children}</ButtonComponent>
}

export default Button
