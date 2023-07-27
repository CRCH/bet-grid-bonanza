import LogoSvg from './logo.svg'

import { LogoWrapper } from './Logo.styles'

const Logo = () => (
  <LogoWrapper>
    <img src={LogoSvg} alt="GameLogo" />
  </LogoWrapper>
)

export default Logo
