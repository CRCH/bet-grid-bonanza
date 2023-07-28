export const mergeBets = (bet1: Record<string, number>, bet2: Record<string, number>): Record<string, number> => {
  const result: Record<string, number> = { ...bet1 }
  Object.keys(bet2).forEach((key) => {
    if (bet2[key]) {
      result[key] = (result[key] || 0) + bet2[key]
    }
  })

  return result
}
