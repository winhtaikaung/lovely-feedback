import { IntlProvider } from 'react-intl'

import * as TestingUtils from '@testing-library/react'

import { translationMessages } from './i18n'
export const render = (ui: React.ReactNode) => {
  const message: TranslationMessages = translationMessages

  return TestingUtils.render(
    <IntlProvider locale="en" key="en" messages={message['en'].default as any}>
      {ui}
    </IntlProvider>,
  )
}
export default TestingUtils
