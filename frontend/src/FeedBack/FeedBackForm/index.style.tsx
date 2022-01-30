import styled, { css } from 'styled-components/macro'
import Box from '../../component/Box/index.style'

import { COLORS, FONT_SIZES } from '../../constants'

const visibleStyle = css`
  width: 350px;
  height: 550px;
  content-visibility: auto;
  transition-delay: 0.7s, 0.3s, 0.3s, 0.3s;
  transition-timing-function: ease-in-out;
  transition-duration: 0.4s;
  transition-property: transform, width, height, border-radius;
`

export const FeedFormUI = styled.div<{ visible: boolean }>`
  width: 0px;
  height: 0px;
  content-visibility: hidden;
  background: ${COLORS.WHITE};
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
  position: fixed;
  bottom: 32px;
  left: 32px;
  border-radius: 5px;

  ${({ visible }) => visible && visibleStyle}
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 380px;
  overflow-y: auto;
  overflow-y: overlay;

  padding-right: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
`

export const SubmitButton = styled.input`
  min-width: 100px;
  height: 50px;
  color: ${COLORS.WHITE};
  background: ${COLORS.BLACK};
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  font-size: ${FONT_SIZES.medium};
  font-weight: bold;
  &:focus-visible {
    outline-color: ${COLORS.GREY};
    outline-width: 0px;
  }
  &:focus {
    outline-color: ${COLORS.GREY};
    outline-width: 0px;
  }
  &:disabled {
    background: ${COLORS.GREY1};
  }
`

export const FormHeader = styled(Box)`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 50px;
  background: ${COLORS.BLACK};
`
