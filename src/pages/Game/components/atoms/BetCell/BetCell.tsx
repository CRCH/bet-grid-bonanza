import { useCallback, useEffect, useState, memo } from 'react'

import { CellContainer, CellId, CellBalance, CellMultiplier, InnerCellBalanceWrapper } from './BetCell.styles'
import { formatMoney } from '@helpers/formatMoney'
import { roundNumber } from '@helpers/roundNumber'

interface BetCellProps {
  id: string
  placeBet: (bet: number) => void
  balance: number
  getMultipliedBalance: number
  bet: number
  multiplier: number
}

const BetCell = memo(({ id, placeBet, balance, bet, multiplier, getMultipliedBalance }: BetCellProps) => {
  const [mult, setMult] = useState(multiplier)

  const placeBetCallback = useCallback(() => {
    placeBet(bet)
  }, [placeBet, bet])

  useEffect(() => {
    setMult(multiplier)
    console.log(balance)
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
