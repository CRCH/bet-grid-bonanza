import styled, { css } from 'styled-components'

const commonButtonStyles = css`
  border: none;
  text-transform: uppercase;
  border-radius: 7px;
  font-size: 17px;
  font-weight: 600;
  color: #fff;
  padding: 8px;
  cursor: pointer;
  transition: all 0.23s ease;
  user-select: none;

  &:active &:not(:disabled) {
    box-shadow: 0px 0px 0px 0px #003556, 0px 0px 0px 0px rgba(0, 157, 255, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`

export const ButtonStyles = {
  primary: styled.button`
    ${commonButtonStyles}
    padding: 15px;
    width: 140px;
    background: radial-gradient(184% 100% at -30% 50%, #74caff 24.48%, #347fad 89.69%);
    box-shadow: 3px 3px 10px 2px #003556, -3px -3px 14px 0px rgba(0, 157, 255, 0.2);

    &:active &:not(:disabled) {
      background: radial-gradient(184% 100% at -30% 50%, blue 24.48%, darkblue 89.69%);
      box-shadow: 0px 0px 0px 0px #003556, 0px 0px 0px 0px rgba(0, 157, 255, 0.2);
    }
  `,
  cancel: styled.button`
    ${commonButtonStyles}
    max-width: 100px;
    background: #fa5757;
    box-shadow: 3px 3px 14px #7b1111, -3px -3px 14px rgba(250, 87, 87, 0.8);
  `,
  shiny: styled.button`
    ${commonButtonStyles}
    width: 100%;
    background: radial-gradient(125% 100% at -30% 50%, #faf870 24.48%, #fa5757 89.69%);
    box-shadow: 5px 5px 14px 0px #6a1818, -5px -5px 14px 0px rgba(251, 238, 110, 0.31);
  `,
}
