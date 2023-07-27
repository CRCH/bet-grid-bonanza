import { ConnectionStatus } from '@pages/Game/stores/GameStore.types'
import Styled from './PageWrapper.styles'

export interface PageWrapperProps {
  children: React.ReactNode
  connectionStatus: ConnectionStatus
}

const PageWrapper = ({ children, connectionStatus }: PageWrapperProps): JSX.Element => (
  <Styled.PageWrapper>
    <Styled.ConnectionBar $isConnected={connectionStatus === ConnectionStatus.connected} />
    {children}
  </Styled.PageWrapper>
)

export default PageWrapper
