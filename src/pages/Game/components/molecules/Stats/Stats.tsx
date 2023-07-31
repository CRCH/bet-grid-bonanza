import { observer } from 'mobx-react-lite'

import { formatMoney } from '@helpers/formatMoney'

import Container from '@components/atoms/Container'

import GameStore from '@pages/Game/stores/GameStore.store'

import { StatWrapper, StatsWrapper } from './Stats.styles'

const Stats = observer((): React.ReactElement => {
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
  return (
    <StatsWrapper>
      {stats.map(({ id, title, value }) => (
        <Container key={id}>
          <StatWrapper data-testid={`stat-wrapper`}>
            <div>{title}</div>
            <div>{value}</div>
          </StatWrapper>
        </Container>
      ))}
    </StatsWrapper>
  )
})

export default Stats
