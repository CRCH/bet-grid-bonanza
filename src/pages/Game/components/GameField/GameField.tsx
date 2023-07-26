import { useState, useEffect } from 'react'
import { Container } from '@components/Container/Container.styles'
import styled from 'styled-components'
import Logo from '../logo.svg'
import { observer } from 'mobx-react-lite'
import { generateFieldData } from '@pages/Game/helpers/generateGrid'
import GameStore from '@pages/Game/stores/GameStore.store'

const Grid = styled.div<{ size: number }>`
  display: grid;
  grid-template-columns: ${({ size }) => `repeat(${size}, 1fr)`};
  column-gap: 15px;
  row-gap: 15px;
  padding: 18px;
`

const Wrapper = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
`

const Cell = styled.button`
  border-radius: 7px;
  background: #373737;
  box-shadow: 3px 3px 14px 0px #212121, -3px -3px 14px 0px #4d4d4d;
  width: 50px;
  height: 50px;
  cursor: pointer;
  outline: none;
  transition: all 0.15s ease;
  color: #fff;
  border: 1px solid #373737;
  user-select: none;

  &:active {
    box-shadow: 0 0 0 0 #212121, 0 0 0 0 #4d4d4d;
    border: 1px solid rgba(43, 43, 43, 1);
  }
`

const LogoWrapper = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  padding-left: 70px;

  img {
    height: 120px;
  }
`

const StatWrapper = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  font-size: 13px;
`

const StatsWrapper = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 15px;
`

const ControlsWrapper = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  justify-items: center;
`

const PrimaryButton = styled.button`
  border: none;
  text-transform: uppercase;
  border-radius: 7px;
  font-size: 17px;
  font-weight: 600;
  color: #fff;
  padding: 15px;
  width: 140px;
  background: radial-gradient(184% 100% at -30% 50%, #74caff 24.48%, #347fad 89.69%);
  box-shadow: 3px 3px 14px 0px #003556, -3px -3px 14px 0px rgba(0, 157, 255, 0.2);
  cursor: pointer;
  transition: all 0.1s ease;

  &:active {
    box-shadow: 0px 0px 0px 0px #003556, 0px 0px 0px 0px rgba(0, 157, 255, 0.2);
  }
`

const CancelButton = styled.button`
  max-width: 100px;
  border: none;
  text-transform: uppercase;
  border-radius: 7px;
  font-size: 17px;
  font-weight: 600;
  color: #fff;
  padding: 8px;
  cursor: pointer;
  background: #fa5757;
  box-shadow: 3px 3px 14px #7b1111, -3px -3px 14px rgba(250, 87, 87, 0.8);
  transition: all 0.1s ease;

  &:active {
    box-shadow: 0px 0px 0px 0px #003556, 0px 0px 0px 0px rgba(0, 157, 255, 0.2);
  }
`

const ShinyButton = styled.button`
  width: 100%;
  border: none;
  text-transform: uppercase;
  border-radius: 7px;
  font-size: 17px;
  font-weight: 600;
  color: #fff;
  padding: 8px;
  cursor: pointer;
  background: radial-gradient(125% 100% at -30% 50%, #faf870 24.48%, #fa5757 89.69%);
  box-shadow: 5px 5px 14px 0px #6a1818, -5px -5px 14px 0px rgba(251, 238, 110, 0.31);
  transition: all 0.1s ease;

  &:active {
    box-shadow: 0px 0px 0px 0px #003556, 0px 0px 0px 0px rgba(0, 157, 255, 0.2);
  }
`

const GameField = observer(() => {
  const [field, setField] = useState<string[]>(generateFieldData(5))
  const [bet, setBet] = useState(1)

  useEffect(() => {
    GameStore.init()
    console.log('call')
  }, [])

  const onStartGame = () => {
    GameStore.startGame()
  }

  const onCellClick = (col: string) => () => {
    GameStore.placeBet(col, bet)
  }
  console.log(123)

  return (
    <>
      <LogoWrapper>
        <img src={Logo} alt="" />
      </LogoWrapper>
      <Wrapper>
        <div>
          <Container>
            <Grid size={5}>
              {field.map((cell) => (
                <Cell onClick={onCellClick(cell)}>{cell}</Cell>
              ))}
            </Grid>
          </Container>
          <StatsWrapper>
            <Container>
              <StatWrapper>
                <div>Balance:</div>
                <div>${GameStore.balance}</div>
              </StatWrapper>
            </Container>
            <Container>
              <StatWrapper>
                <div>Current bet:</div>
                <div>${1}</div>
              </StatWrapper>
            </Container>
            <Container>
              <StatWrapper>
                <div>Last payout:</div>
                <div>${GameStore.payout}</div>
              </StatWrapper>
            </Container>
          </StatsWrapper>
          <ControlsWrapper>
            <CancelButton>Cancel</CancelButton>
            <PrimaryButton onClick={onStartGame}>Start</PrimaryButton>
            <ShinyButton>x2</ShinyButton>
          </ControlsWrapper>
        </div>
      </Wrapper>
    </>
  )
})

export default GameField
