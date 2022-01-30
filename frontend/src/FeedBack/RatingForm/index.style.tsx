import styled, { css, keyframes } from 'styled-components/macro'

import Text from '../../component/Text/index.style'
import { COLORS } from '../../constants'

const visibleStyle = css`
  width: 350px;
  height: 200px;
  content-visibility: auto;

  transition-delay: 0.7s, 0.3s, 0.3s, 0.3s;
  transition-timing-function: ease-in-out;
  transition-duration: 0.4s;
  transition-property: transform, width, height, border-radius;
`

export const RatingFormUI = styled.div<{ visible: boolean }>`
  width: 0px;
  height: 0px;
  background: ${COLORS.WHITE};
  content-visibility: hidden;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
  position: fixed;
  bottom: 32px;
  left: 32px;
  border-radius: 5px;

  ${({ visible }) => visible && visibleStyle}
`
export const FabIcon = styled.div`
  background: #000;
  width: 64px;
  height: 64px;
  border-radius: 50px 50px 50px 50px;
  text-align: center;
  color: #fff;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
  font-size: 2.6667em;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: default;
`

const topToBottomSlide = keyframes`
    100% {  transform: translate(0,0px); }
`

export const AnimatedTitle = styled(Text)`
  transform: translate(0, -30px);
  transition: translate 0 linear;
  animation: ${topToBottomSlide} 0.3s forwards;
  animation-delay: 0.3s;
  margin-bottom: 0;
`

export const AnimatedButtonWrapper = styled.div`
  transform: translate(0, -30px);
  transition: translate 0 linear;
  animation: ${topToBottomSlide} 0.3s forwards;
  animation-delay: 0.3s;
`
