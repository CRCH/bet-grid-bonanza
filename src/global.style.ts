import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    font-family: Inter;
    box-sizing: border-box;
  }

  body {
    background: #373737;
    color: #fff;
    margin: 0;
  }
`

export default GlobalStyle
