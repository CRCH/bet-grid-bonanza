import { observer } from 'mobx-react-lite'

import Button from '@components/atoms/Button/Button'
import ThreeDotLoader from '@components/atoms/ThreeDotLoader/ThreeDotLoader'

import GameStore from '@pages/Game/stores/GameStore.store'

import { GamePhase } from 'types/index.types'

import { ControlsWrapper } from './Controls.styles'

const Controls = observer(() => {
  const isInDisabledPhase = GameStore.gamePhase !== GamePhase.BetsOpen
  const isMinBetPlaced = GameStore.totalBet >= GameStore.gameSettings.betLimits.min
  console.log(GameStore.totalBet)
  const isDisabledClear = isInDisabledPhase || !isMinBetPlaced
  const isDisabledUndo = isInDisabledPhase || GameStore.lastRoundBets.length === 0
  const isDisabledStart = isInDisabledPhase || !isMinBetPlaced
  const isDisabledDouble = isInDisabledPhase || !isMinBetPlaced || !GameStore.validateBet(GameStore.totalBet)
  const isDisabledRepeat =
    isInDisabledPhase ||
    Object.keys(GameStore.previousRoundBets).length === 0 ||
    GameStore.previousRoundTotal > GameStore.balance

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

  return (
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
  )
})

export default Controls
