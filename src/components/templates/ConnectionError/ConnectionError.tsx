import { ErrorWrapper } from './ConnectionError.styles'

type ConnectionErrorProps = {
  children: React.ReactNode
}

const ConnectionError = ({ children }: ConnectionErrorProps): React.ReactElement => (
  <ErrorWrapper>{children}</ErrorWrapper>
)

export default ConnectionError
