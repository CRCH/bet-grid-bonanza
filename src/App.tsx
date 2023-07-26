import { useState } from 'react'
import GameStore from './pages/Game/stores/GameStore.store'
import { observer } from 'mobx-react-lite'
import { generateFieldData } from './pages/Game/helpers/generateGrid'
import { styled } from 'styled-components'
import GlobalStyle from './global.style'

import Container from '@components/Container'
import GamePage from '@pages/Game'

const Cell = styled.div<{ disabled: boolean }>`
  margin: 5px;
  border: 1px solid black;
  padding: 5px;
  display: inline-block;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
`

const App = observer(() => {
  const [field, setField] = useState<string[][]>([])
  const [bet, setBet] = useState(1)
  const onClick = () => {
    GameStore.init()
  }

  const onCellClick = (col: string) => () => {
    GameStore.placeBet(col, bet)
  }

  const onStartGame = () => {
    GameStore.startGame()
  }
  console.log(generateFieldData(5))
  return (
    <>
      <GlobalStyle />
      <GamePage />

      <div>Status: {GameStore.connectionStatus}</div>
      <div>GamePhase: {GameStore.gamePhase}</div>
      <div>Balance: {GameStore.balance}</div>
      <input
        type="number"
        step={10}
        value={bet}
        onChange={({ target: { value } }) => {
          setBet(+value)
        }}
      />
      <button onClick={onClick}>InitTest</button>
      <button onClick={onStartGame} disabled={GameStore.gamePhase !== 'BetsOpen'}>
        startGame
      </button>

      <div>
        {field.map((row, idx) => (
          <div key={`row-${idx}`}>
            {row.map((col, _idx) => (
              <Cell key={`col-${_idx}`} disabled={GameStore.gamePhase !== 'BetsOpen'} onClick={onCellClick(col)}>
                {col}
              </Cell>
            ))}
          </div>
        ))}
      </div>
      <div>LastPayout: {GameStore.payout}</div>
    </>
  )
})

export default App
