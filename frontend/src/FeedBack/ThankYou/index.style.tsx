import styled, { css } from 'styled-components/macro'

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

export const ThankYouUI = styled.div<{ visible: boolean }>`
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
