import styled from 'styled-components'

export const Grid = styled.div<{ size: number }>`
  display: grid;
  grid-template-columns: ${({ size }) => `repeat(${size}, 1fr)`};
  column-gap: 15px;
  row-gap: 15px;
  padding: 18px;
`

export default { Grid }
