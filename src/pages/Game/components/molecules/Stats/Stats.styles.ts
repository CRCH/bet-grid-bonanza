import styled from 'styled-components'

export const StatWrapper = styled.div`
  data-testid: 'stat-wrapper';
  padding: 5px;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  font-size: 13px;
`

export const StatsWrapper = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 15px;
`
