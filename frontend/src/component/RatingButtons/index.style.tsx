import styled, { css } from 'styled-components/macro'
import { COLORS } from '../../constants'

export const RatingButtonUI = styled.li<{ isDisabled: boolean }>`
  width: 40px;
  height: 40px;
  border-right: 1px solid ${COLORS.BLACK};
  border-top: 1px solid ${COLORS.BLACK};
  border-bottom: 1px solid ${COLORS.BLACK};
  display: flex;
  align-items: center;
  justify-content: space-around;
  &:hover {
    background: ${COLORS.GREY};
  }
  cursor: default;
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      cursor: not-allowed;
    `}
`

export const RatingButtonWrapper = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;

  li: nth-child(1) {
    border-left: 1px solid ${COLORS.BLACK};
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  li:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`
