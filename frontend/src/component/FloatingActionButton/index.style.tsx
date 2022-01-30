import styled, { css } from 'styled-components'

export const hoverCss = css`
  width: 230px;
  transition: all 0.2s linear;
`

export const FabUI = styled.div`
  background: #000;
  width: 64px;
  height: 64px;
  border-radius: 50px 50px 50px 50px;
  text-align: center;
  color: #fff;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
  position: fixed;
  bottom: 32px;
  left: 32px;
  font-size: 2.6667em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  transition: all 0.3s linear;

  &:hover {
    ${hoverCss}
  }
`
