import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import GameStore from '@pages/Game/stores/GameStore.store'
import Logo from '@pages/Game/components/atoms/Logo/Logo'
import Stats from '@pages/Game/components/molecules/Stats/Stats'
import BetAmountSelect from '@pages/Game/components/molecules/BetAmountSelect/BetAmountSelect'
import BettingField from '@pages/Game/components/molecules/BettingField/BettingField'
import Controls from '@pages/Game/components/molecules/Controls'
import { ConnectionStatus, FieldSize } from '@pages/Game/stores/GameStore.types'
import { GameLevels } from 'types/index.types'

import { Wrapper } from './GameField.styles'

const getLevel = (level: string): FieldSize => {
  return GameLevels[level as keyof typeof GameLevels] || 5
}

const GameField = observer(() => {
  const searchParams = new URLSearchParams(document.location.search)
  const fieldSize = getLevel(searchParams.get('level') || '')

  useEffect(() => {
    GameStore.init(fieldSize)
  }, [fieldSize])

  if (GameStore.connectionStatus === ConnectionStatus.disconnected) {
    return <Logo />
  }

  return (
    <>
      <Logo />
      <Wrapper>
        <BettingField fieldSize={fieldSize} />
        <Stats />
        <BetAmountSelect />
        <Controls />
      </Wrapper>
    </>
  )
})

export default GameField
