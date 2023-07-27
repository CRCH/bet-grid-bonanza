export const roundNumber = (num: number, decimalPlaces = 2): number => {
  return Number(num.toFixed(decimalPlaces))
}
