import styled, { keyframes } from 'styled-components'

export const PageWrapper = styled.div`
  margin: auto;
  max-width: 1024px;
`
const pulse = keyframes`
  0% {
    opacity: 0.8;
  }
  50% {
    opacity: 0;

  }
  100% {
    opacity: 0.7;
  }

`

export const ConnectionBar = styled.div<{ $isConnected: boolean }>`
  height: 3px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: ${({ $isConnected }) => ($isConnected ? 'green' : 'red')};
  animation: ${pulse} 5s linear;
`

export default { PageWrapper, ConnectionBar }
