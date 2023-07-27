import PageWrapper from '@components/templates/PageWrapper'
import GameField from './components/organisms/GameField/GameField'
import { observer } from 'mobx-react-lite'
import GameStore from './stores/GameStore.store'
import ConnectionError from '@components/templates/ConnectionError/ConnectionError'

const GamePage = observer(() => (
  <PageWrapper connectionStatus={GameStore.connectionStatus}>
    <GameField />
    {GameStore.connectionError ? (
      <ConnectionError>
        <h1>
          Something went wrong.
          <br /> Try again later :(
        </h1>
      </ConnectionError>
    ) : null}
  </PageWrapper>
))

export default GamePage
