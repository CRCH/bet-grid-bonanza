import Styled from './PageWrapper.styles'
import { PageWrapperProps } from './PageWrapper.types'

const PageWrapper = ({ children }: PageWrapperProps): JSX.Element => <Styled.PageWrapper>{children}</Styled.PageWrapper>

export default PageWrapper
