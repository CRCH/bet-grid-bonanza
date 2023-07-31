import { observer } from 'mobx-react-lite'

import Container from '@components/atoms/Container'
import GameStore from '@pages/Game/stores/GameStore.store'
import BetCell from '@pages/Game/components/atoms/BetCell'
import Grid from '@pages/Game/components/atoms/Grid/Grid'

import { GamePhase } from 'types/index.types'

const BettingField = observer(({ fieldSize }: { fieldSize: number }) => {
  const isInDisabledPhase = GameStore.gamePhase !== GamePhase.BetsOpen
  const isAbleToBet = GameStore.validateBet(GameStore.gameSettings.activeBet)

  return (
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
          />
        ))}
      </Grid>
    </Container>
  )
})

export default BettingField
