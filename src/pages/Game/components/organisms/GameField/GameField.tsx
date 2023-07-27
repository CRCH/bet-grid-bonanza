import { useEffect } from 'react'
import { Container } from '@components/atoms/Container/Container.styles'
import { observer } from 'mobx-react-lite'

import GameStore from '@pages/Game/stores/GameStore.store'
import Logo from '@pages/Game/components/atoms/Logo/Logo'
import Grid from '@pages/Game/components/atoms/Grid'
import BetCell from '@pages/Game/components/atoms/BetCell/BetCell'
import Stats from '@pages/Game/components/molecules/Stats/Stats'
import Button from '@components/atoms/Button/Button'

import { ControlsWrapper, Wrapper } from './GameField.styles'

const GameField = observer(() => {
  const bet = 1

  useEffect(() => {
    GameStore.init(5)
    console.log('RUN')
  }, [])

  const onStartGame = () => {
    GameStore.startGame()
  }

  const stats = [
    {
      id: '1',
      title: 'Balance:',
      value: `$${GameStore.balance}`,
    },
    {
      id: '2',
      title: 'Current bet:',
      value: `$${bet}`,
    },
    {
      id: '3',
      title: 'Last payout:',
      value: `$${GameStore.payout}`,
    },
  ]

  return (
    <>
      <Logo />
      <Wrapper>
        <Container>
          <Grid size={5}>
            {GameStore.fieldArray.map((props) => (
              <BetCell key={props.id} {...props} bet={bet} />
            ))}
          </Grid>
        </Container>
        <Stats stats={stats} />
        <ControlsWrapper>
          <Button appearance="cancel">Cancel</Button>
          <Button appearance="primary" onClick={onStartGame}>
            Start
          </Button>
          <Button appearance="shiny">x2</Button>
        </ControlsWrapper>
      </Wrapper>
    </>
  )
})

export default GameField
