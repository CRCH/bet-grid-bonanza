import PageWrapper from '@components/templates/PageWrapper'
import GameField from './components/organisms/GameField/GameField'
import { observer } from 'mobx-react-lite'
import GameStore from './stores/GameStore.store'

const GamePage = observer(() => (
  <PageWrapper connectionStatus={GameStore.connectionStatus}>
    <GameField />
  </PageWrapper>
))

export default GamePage
