export const generateFieldData = (size: number): string[] => {
  const fieldData: string[][] = []

  for (let i = 1; i <= size; i++) {
    const row: string[] = []
    for (let j = 1; j <= size; j++) {
      row.push(`${String.fromCharCode(64 + j)}${i}`)
    }
    fieldData.push(row)
  }

  return fieldData.flat()
}
