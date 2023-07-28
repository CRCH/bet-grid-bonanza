export const revertBet = (bet: Record<string, number>): Record<string, number> => {
  const result: Record<string, number> = {}
  Object.keys(bet).forEach((key) => {
    if (bet[key]) {
      result[key] = -bet[key]
    }
  })

  return result
}
