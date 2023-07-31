import { observer } from 'mobx-react-lite'

import Container from '@components/atoms/Container'

import GameStore from '@pages/Game/stores/GameStore.store'

import { BetAmountWrapper, Chip, ChipsWrapper, Title } from './BetAmountSelect.styles'


const BetAmountSelect = observer((): React.ReactNode => {
  const activeBet = GameStore.gameSettings.activeBet
  const handleChipClick = (chip: number) => () => {
    if (chip === activeBet) return
    GameStore.gameSettings.setActiveBet(chip)
  }
  const chips = GameStore.gameSettings.chips

  return (
    <BetAmountWrapper>
      <Container>
        <Title>Bet amount:</Title>
        <ChipsWrapper>
          {chips.map((chip) => (
            <Chip data-testid="bet-chip" key={chip} $isActive={chip === activeBet} onClick={handleChipClick(chip)}>
              ${chip}
            </Chip>
          ))}
        </ChipsWrapper>
      </Container>
    </BetAmountWrapper>
  )
})

export default BetAmountSelect
