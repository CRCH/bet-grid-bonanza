import styled, { keyframes } from 'styled-components'

const flexCenter = `
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CellContainer = styled.button`
  background: #373737;
  border: 1px solid #373737;
  border-radius: 7px;
  box-shadow: 3px 3px 14px 0px #212121, -3px -3px 14px 0px #4d4d4d;
  color: #fff;
  cursor: pointer;
  height: 50px;
  outline: none;
  padding: 0;
  position: relative;
  user-select: none;
  width: 50px;

  ${flexCenter}
  flex-direction: column;

  transition: all 0.15s ease;

  &:active {
    border: 1px solid rgba(43, 43, 43, 1);
    box-shadow: 0 0 0 0 #212121, 0 0 0 0 #4d4d4d;
  }
`

export const CellBalance = styled.div`
  font-size: 0.7em;
`

export const CellId = styled.div`
  font-size: 10px;
  font-weight: 100;
  position: absolute;
  top: 5px;
  left: 5px;
`

const fadeIfAnimation = keyframes`
  0% {
    opacity: 0;
  }
  20%, 70% {
    opacity: 0.7;
    visibility: visible;
  }
  100% {
    opacity: 0;
  }
`

export interface CellMultiplierProps {
  win?: boolean | null
}

export const CellMultiplier = styled.div<CellMultiplierProps>`
  background: ${({ win }) => (win ? '#00ab84' : '#82001e')};
  border-radius: 7px;
  color: #fff;
  font-size: 0.8em;
  height: 110%;
  position: absolute;
  visibility: hidden;
  width: 110%;
  z-index: 2;

  ${flexCenter}

  animation: ${fadeIfAnimation} 3s ease 1;
`
