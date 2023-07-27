import { useCallback, useEffect, useState, memo } from 'react'

import { CellContainer, CellId, CellBalance, CellMultiplier } from './BetCell.styles'

interface BetCellProps {
  id: string
  placeBet: (bet: number) => void
  cellBalance: number
  bet: number
  multiplier: number
}

const BetCell = memo(({ id, placeBet, cellBalance, bet, multiplier }: BetCellProps) => {
  const [mult, setMult] = useState(multiplier)

  const placeBetCallback = useCallback(() => {
    placeBet(bet)
  }, [placeBet, bet])

  useEffect(() => {
    setMult(multiplier)
    console.log(cellBalance > 0)

    const timer = setTimeout(() => {
      setMult(0)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [multiplier, cellBalance])

  const balanceDisplay = cellBalance && !mult ? <CellBalance>{cellBalance}$</CellBalance> : null
  const multiplierDisplay = mult ? <CellMultiplier win={cellBalance > 0 || null}>x{mult}</CellMultiplier> : null

  return (
    <CellContainer key={id} onClick={placeBetCallback}>
      <CellId>{id}</CellId>
      {balanceDisplay}
      {multiplierDisplay}
    </CellContainer>
  )
})

export default BetCell
