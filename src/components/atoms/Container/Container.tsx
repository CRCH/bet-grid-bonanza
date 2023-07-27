import Styled from './Container.styles'

export interface ContainerProps {
  children: React.ReactNode
}

const Container = ({ children }: ContainerProps): React.ReactElement => <Styled.Container>{children}</Styled.Container>

export default Container
