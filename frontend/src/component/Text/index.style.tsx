import { StandardProperties, VendorProperties, ObsoleteProperties } from 'csstype'
import styled from 'styled-components/macro'

const kebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()

type BoxType = StandardProperties & VendorProperties & ObsoleteProperties

const Text = styled.p<BoxType>((p) => {
  const { theme, children, ...cssObject } = p

  const cssProps = Object.keys(cssObject).map((i: string) => ({
    [kebabCase(i)]: cssObject[i as keyof BoxType],
  }))

  return Object.assign({}, ...cssProps)
})

export default Text