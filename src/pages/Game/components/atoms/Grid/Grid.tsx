import Styles from './Grid.styles'

type GridProps = {
  size: number
  children: React.ReactNode
  $disabled: boolean
}

const Grid = ({ size, children, $disabled }: GridProps): React.ReactElement => (
  <Styles.Grid disabled={$disabled} size={size}>
    {children}
  </Styles.Grid>
)

export default Grid
