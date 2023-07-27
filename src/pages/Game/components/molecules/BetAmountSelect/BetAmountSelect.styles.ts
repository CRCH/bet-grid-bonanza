import styled from 'styled-components'

export const BetAmountWrapper = styled.div`
  margin: 15px 0;
  width: 100%;
`

export const ChipsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 18px 10px;
  width: 100%;
  flex-wrap: wrap;
  font-size: 12px;
`

export const Chip = styled.div<{ $isActive: boolean }>(
  ({ $isActive }) => `
  display: inline-flex;
  padding: 0 5px;
  border-radius: 10px;
  user-select: none;
  cursor: pointer;
  transition: all 0.23s ease;

  &:hover {
    background: #fff;
    border-color: #fff;
    color: #373737;
  }

  ${
    $isActive
      ? `
          border: 1px solid #fff;
        `
      : ''
  }
  
`
)

export const Title = styled.div`
  font-size: 12px;
  padding: 10px 18px 0;
`
