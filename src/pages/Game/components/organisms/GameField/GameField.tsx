import { useEffect } from 'react'
import { Container } from '@components/atoms/Container/Container.styles'
import { observer } from 'mobx-react-lite'

import GameStore from '@pages/Game/stores/GameStore.store'
import Logo from '@pages/Game/components/atoms/Logo/Logo'
import Grid from '@pages/Game/components/atoms/Grid'
import BetCell from '@pages/Game/components/atoms/BetCell/BetCell'
import Stats from '@pages/Game/components/molecules/Stats/Stats'
import BetAmountSelect from '@pages/Game/components/molecules/BetAmountSelect/BetAmountSelect'
import ThreeDotLoader from '@components/atoms/ThreeDotLoader/ThreeDotLoader'
import Button from '@components/atoms/Button/Button'

import { formatMoney } from '@helpers/formatMoney'
import { GameLevels, GamePhase } from 'types/index.types'
import { ConnectionStatus, FieldSize } from '@pages/Game/stores/GameStore.types'

import { ControlsWrapper, Wrapper } from './GameField.styles'
import { toJS } from 'mobx'

const getLevel = (level: string): FieldSize => {
  return GameLevels[level as keyof typeof GameLevels] || 5
}

const GameField = observer(() => {
  const searchParams = new URLSearchParams(document.location.search)
  const fieldSize = getLevel(searchParams.get('level') || '')

  const bet = GameStore.gameSettings.activeBet
  const isAbleToBet = GameStore.validateBet(bet)
  const isMinBetPlaced = GameStore.totalBet >= GameStore.gameSettings.betLimits.min
  const isInDisabledPhase = GameStore.gamePhase !== GamePhase.BetsOpen

  const isDisabledClear = isInDisabledPhase || !isMinBetPlaced
  const isDisabledUndo = isInDisabledPhase || GameStore.lastRoundBets.length === 0
  const isDisabledStart = isInDisabledPhase || !isMinBetPlaced
  const isDisabledDouble = isInDisabledPhase || !isMinBetPlaced || !GameStore.validateBet(GameStore.totalBet)
  const isDisabledRepeat =
    isInDisabledPhase ||
    Object.keys(GameStore.previousRoundBets).length === 0 ||
    GameStore.previousRoundTotal > GameStore.balance

  console.log(toJS(GameStore.roundBets), toJS(GameStore.lastRoundBets))
  useEffect(() => {
    GameStore.init(fieldSize)
    console.log('RUN')
  }, [fieldSize])

  const handleClear = () => {
    GameStore.clearBets()
  }

  const handleUndo = () => {
    GameStore.undoLastBet()
  }

  const handleStartGame = () => {
    GameStore.startGame()
  }

  const handleDouble = () => {
    GameStore.doubleBets()
  }

  const handleRepeat = () => {
    GameStore.repeatBets()
  }

  const stats = [
    {
      id: '1',
      title: 'Balance:',
      value: formatMoney(GameStore.balance),
    },
    {
      id: '2',
      title: 'Total bet:',
      value: formatMoney(GameStore.totalBet),
    },
    {
      id: '3',
      title: 'Last payout:',
      value: formatMoney(GameStore.payout),
    },
  ]

  if (GameStore.connectionStatus === ConnectionStatus.disconnected) {
    return <Logo />
  }

  return (
    <>
      <Logo />
      <Wrapper>
        <Container>
          <Grid size={fieldSize} $disabled={isInDisabledPhase || !isAbleToBet}>
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
        {GameStore.gameSettings !== null ? (
          <BetAmountSelect
            chips={GameStore.gameSettings.chips}
            activeBet={GameStore.gameSettings.activeBet}
            setActiveBet={GameStore.gameSettings.setActiveBet}
          />
        ) : null}

        <ControlsWrapper>
          <Button disabled={isDisabledClear} appearance="cancel" onClick={handleClear}>
            C
          </Button>
          <Button disabled={isDisabledUndo} appearance="shiny" onClick={handleUndo}>
            U
          </Button>
          <Button disabled={isDisabledStart} appearance="primary" onClick={handleStartGame}>
            {isInDisabledPhase ? <ThreeDotLoader /> : 'Start'}
          </Button>
          <Button disabled={isDisabledDouble} onClick={handleDouble} appearance="shiny">
            x2
          </Button>
          <Button disabled={isDisabledRepeat} onClick={handleRepeat} appearance="shiny">
            R
          </Button>
        </ControlsWrapper>
      </Wrapper>
    </>
  )
})

export default GameField
