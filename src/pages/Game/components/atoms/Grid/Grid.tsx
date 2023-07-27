import Styles from './Grid.styles'

type GridProps = {
  size: number
  children: React.ReactNode
}

const Grid = ({ size, children }: GridProps): React.ReactElement => <Styles.Grid size={size}>{children}</Styles.Grid>

export default Grid
