import Styled from './PageWrapper.styles'

export interface PageWrapperProps {
  children: React.ReactNode
}

const PageWrapper = ({ children }: PageWrapperProps): JSX.Element => <Styled.PageWrapper>{children}</Styled.PageWrapper>

export default PageWrapper
