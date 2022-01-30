import styled from 'styled-components/macro'

import { COLORS, FONT_SIZES } from '../../../constants'

export const InputText = styled.input`
  border-radius: 5px;
  border-color: ${COLORS.GREY};
  font-size: ${FONT_SIZES.small1};
  height: 40px;
  border-style: solid;
  border-width: 1px;
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
