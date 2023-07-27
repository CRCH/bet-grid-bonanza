import Container from '@components/atoms/Container'

import { BetAmountWrapper, Chip, ChipsWrapper, Title } from './BetAmountSelect.styles'
import { SettingsPayload } from 'types/index.types'

type BetAmountSelectProps = {
  chips: SettingsPayload['chips']
  setActiveBet: (bet: number) => void
  activeBet: number
}

const BetAmountSelect = ({ chips, setActiveBet, activeBet }: BetAmountSelectProps): React.ReactNode => {
  const handleChipClick = (chip: number) => () => {
    if (chip === activeBet) return
    setActiveBet(chip)
  }

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
}

export default BetAmountSelect
