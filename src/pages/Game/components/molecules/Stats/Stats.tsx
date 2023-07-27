import { Container } from '@components/atoms/Container/Container.styles'
import { StatWrapper, StatsWrapper } from './Stats.styles'

type StatProps = {
  stats: {
    id: string
    title: string
    value: string | number
  }[]
}

const Stats = ({ stats }: StatProps): React.ReactElement => (
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

export default Stats
