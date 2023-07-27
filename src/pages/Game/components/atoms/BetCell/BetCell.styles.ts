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
  z-index: 0;

  ${flexCenter}
  flex-direction: column;

  transition: all 0.15s ease;

  &:active {
    border: 1px solid rgba(43, 43, 43, 1);
    box-shadow: 0 0 0 0 #212121, 0 0 0 0 #4d4d4d;
  }
`
const epicNumber = keyframes`
  0% {
    transform: rotate(0deg);
    font-size: 1.5em
  }
  100% {
    font-size: 0.7em
    transform: rotate(-35deg);
  }
`

export const CellBalance = styled.div`
  font-size: 0.7em;
  animation: ${epicNumber} 0.5s ease;
  background: #85bb65;
  border-radius: 2px;
  z-index: 2;
  transform: rotate(-45deg);
  font-weight: 500;
  overflow: hidden;
  box-shadow: 1px 2px 2px 1.1px rgba(0, 0, 0, 0.51);
`
export const InnerCellBalanceWrapper = styled.div<{ $isWin: number }>`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 2px 0;
  background: radial-gradient(24% 160% at 46% 59%, rgba(255, 255, 255, 0.3) 24.48%, rgba(0, 0, 0, 0) 89.69%);
  ${({ $isWin }) => ($isWin ? 'font-size: 2em;' : ``)}
  & span {
    margin: 0 5px;
  }

  &:after {
    content: '';
    position: absolute;
    width: 5px;
    height: 90%;
    background: #105a37;
    right: 0;
    top: 1px;
    opacity: 0.5;
    border-radius: 4px;
  }
`

export const CellId = styled.div`
  font-size: 10px;
  font-weight: 100;
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 1;
`

const fadeIfAnimation = keyframes`
  0% {
    opacity: 0;
    font-size: 1.8;
    height: 150%;
    width: 150%;
    z-index: 3;
  }
  20%, 60% {
    opacity: 0.85;
    visibility: visible;
    font-size: 1.2em;
    height: 100%;
    width: 100%;
  }
  80% {
    z-index: 1;

  }
  100% {
    opacity: 0;
    font-size: 1.2em;
    z-index: 1;
  }
`

export const CellMultiplier = styled.div<{ $isWin: number }>`
  background: ${({ $isWin }) => ($isWin ? '#00ab84' : '#82001e')};
  border-radius: 7px;
  color: #fff;
  font-size: 1.2em;
  height: 110%;
  position: absolute;
  visibility: hidden;
  width: 110%;
  z-index: 1;
  font-weight: 800;

  ${flexCenter}

  animation: ${fadeIfAnimation} 3s ease;
`
