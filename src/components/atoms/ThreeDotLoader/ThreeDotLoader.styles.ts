import styled, { css, keyframes } from 'styled-components'

export const blink = keyframes`
  0% {
    opacity: .2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: .2;
  }
`

const dotStyle = css`
  display: inline;
  height: 7px;
  width: 7px;
  background: #fff;
  margin: 5px;
  border-radius: 100%;
`

export const Dot = styled.span`
  animation: ${blink} 1s linear infinite;
  ${dotStyle}

  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`

export const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &:after {
    content: '';
    ${dotStyle}
  }
`
