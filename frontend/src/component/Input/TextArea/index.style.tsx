import styled from 'styled-components/macro'

import { COLORS, FONT_SIZES } from '../../../constants'

export const TextAreaUI = styled.textarea`
  border-radius: 5px;
  border-color: ${COLORS.GREY};
  resize: none;
  font-size: ${FONT_SIZES.small1};
  &:focus-visible {
    outline-color: ${COLORS.GREY};
  }
  &:focus {
    outline-color: ${COLORS.GREY};
    outline-width: 0px;
    box-shadow: 0 0 6px 0px #0022ff;
  }
  &::placeholder {
    color: ${COLORS.DARK_GREY};
    font-size: ${FONT_SIZES.small1};
  }
`
