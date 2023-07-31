import { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { formatMoney } from '@helpers/formatMoney'
import { roundNumber } from '@helpers/roundNumber'

import GameStore from '@pages/Game/stores/GameStore.store'

import { CellContainer, CellId, CellBalance, CellMultiplier, InnerCellBalanceWrapper } from './BetCell.styles'

interface BetCellProps {
  id: string
  placeBet: (bet: number) => void
  balance: number
  getMultipliedBalance: number
  multiplier: number
}

const BetCell = observer(({ id, placeBet, balance, multiplier, getMultipliedBalance }: BetCellProps) => {
  const [mult, setMult] = useState(multiplier)

  const placeBetCallback = useCallback(() => {
    placeBet(GameStore.gameSettings.activeBet)
  }, [placeBet])

  useEffect(() => {
    setMult(multiplier)

    const timer = setTimeout(() => {
      setMult(0)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [multiplier, balance])

  const isWin = mult && balance

  const balanceDisplay = balance ? (
    <CellBalance>
      <InnerCellBalanceWrapper $isWin={isWin}>
        <span>{formatMoney(getMultipliedBalance)}</span>
      </InnerCellBalanceWrapper>
    </CellBalance>
  ) : null
  const multiplierDisplay = mult ? <CellMultiplier $isWin={isWin}>x{roundNumber(mult)}</CellMultiplier> : null

  return (
    <CellContainer key={getMultipliedBalance} onClick={placeBetCallback}>
      <CellId>{id}</CellId>
      {balanceDisplay}
      {multiplierDisplay}
    </CellContainer>
  )
})

export default BetCell
