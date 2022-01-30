import { IntlProvider } from 'react-intl'

import { render as customRender } from '@testing-library/react'
import * as TestingUtils from '@testing-library/react'
import { translationMessages } from './i18n'
export const render = (ui: React.ReactNode) => {
  const message: TranslationMessages = translationMessages

  return customRender(
    <IntlProvider locale="en" key="en" messages={message['en'].default as any}>
      {ui}
    </IntlProvider>,
  )
}
export default TestingUtils
