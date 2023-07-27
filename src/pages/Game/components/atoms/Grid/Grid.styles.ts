import styled from 'styled-components'
import { CellContainer } from '../BetCell/BetCell.styles'

export const Grid = styled.div<{ size: number; disabled?: boolean }>(
  ({ disabled, size }) => `
  display: grid;
  grid-template-columns: repeat(${size}, 1fr);
  column-gap: 15px;
  row-gap: 15px;
  padding: 18px;

  ${CellContainer} {
    ${
      disabled
        ? `
          transition: all 2.3s ease;
          box-shadow: none;
          border: 1px solid rgba(43, 43, 43, 1);
          cursor: default;
          `
        : ''
    }
  }
`
)

export default { Grid }
