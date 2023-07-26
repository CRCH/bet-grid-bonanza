import { ContainerProps } from './Container.types'

import Styled from './Container.styles'

const Container = ({ children }: ContainerProps): JSX.Element => <Styled.Container>{children}</Styled.Container>

export default Container
