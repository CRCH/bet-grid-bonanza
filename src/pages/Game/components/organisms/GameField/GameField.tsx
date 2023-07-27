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
import { formatMoney } from '@helpers/formatMoney'
import { GamePhase } from 'types/index.types'
import { ConnectionStatus } from '@pages/Game/stores/GameStore.types'

const GameField = observer(() => {
  const bet = 10

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
      value: formatMoney(GameStore.balance),
    },
    {
      id: '2',
      title: 'Current bet:',
      value: formatMoney(bet),
    },
    {
      id: '3',
      title: 'Last payout:',
      value: formatMoney(GameStore.payout),
    },
  ]

  const isDisabled = GameStore.gamePhase !== GamePhase.BetsOpen

  if (GameStore.connectionStatus === ConnectionStatus.disconnected) {
    return <Logo />
  }

  return (
    <>
      <Logo />
      <Wrapper>
        <Container>
          <Grid size={5} $disabled={isDisabled}>
            {GameStore.fieldArray.map(({ id, getMultipliedBalance, multiplier, balance, placeBet }) => (
              <BetCell
                key={id}
                id={id}
                placeBet={placeBet}
                balance={balance}
                multiplier={multiplier}
                getMultipliedBalance={getMultipliedBalance}
                bet={bet}
              />
            ))}
          </Grid>
        </Container>
        <Stats stats={stats} />
        <ControlsWrapper>
          <Button disabled={isDisabled} appearance="cancel">
            Cancel
          </Button>
          <Button disabled={isDisabled} appearance="primary" onClick={onStartGame}>
            Start
          </Button>
          <Button disabled={isDisabled} appearance="shiny">
            x2
          </Button>
        </ControlsWrapper>
      </Wrapper>
    </>
  )
})

export default GameField
