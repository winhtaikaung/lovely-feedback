import React from 'react'
import ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'

import App from './App'
import { translationMessages } from './i18n'
import './index.css'
import reportWebVitals from './reportWebVitals'

const language: any = navigator.language.split(/[-_]/)[0]
const message: TranslationMessages = translationMessages

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale={language} key={language} messages={message[language].default as any}>
      <App />
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
