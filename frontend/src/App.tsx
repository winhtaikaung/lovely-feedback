import React from 'react'

import './App.css'
import Portal from './component/Portal'
import FeedBack from './FeedBack'

function App() {
  const widgetPortal = React.useMemo(() => {
    const root = document.getElementById('widget-root')

    if (root) return root

    const newRoot = document.createElement('div')
    newRoot.setAttribute('id', 'widget-root')
    document.body.appendChild(newRoot)

    return document.getElementById('widget-root')
  }, [])

  return (
    <div className="App">
      <Portal rootNode={widgetPortal}>
        <FeedBack />
      </Portal>
    </div>
  )
}

export default App
