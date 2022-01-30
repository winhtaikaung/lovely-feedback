import { createPortal } from 'react-dom'

const Portal: React.FC<{
  children: React.ReactNode
  rootNode: HTMLElement | null
}> = ({ children, rootNode }) => {
  if (!children || !rootNode) return null

  return createPortal(children, rootNode)
}

export default Portal
