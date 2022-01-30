import { shouldPolyfill } from '@formatjs/intl-pluralrules/should-polyfill'

import * as deTranslationJSON from './translations/de.json'
import * as enTranslationJSON from './translations/en.json'
import './types/types.d.ts'
async function polyfill(locale: string) {
  if (shouldPolyfill()) {
    // Load the polyfill 1st BEFORE loading data
    await import('@formatjs/intl-pluralrules/polyfill')
  }
  // @ts-ignore
  if (Intl.PluralRules.polyfilled) {
    switch (locale) {
      default:
        await import('@formatjs/intl-pluralrules/locale-data/en')
        break
      case 'de':
        await import('@formatjs/intl-pluralrules/locale-data/de')
        break
    }
  }
}
polyfill('en')
polyfill('de')

const enTranslationMessages = enTranslationJSON
const deTranslationMessages = deTranslationJSON

export const appLocales = ['en', 'de']

export const DEFAULT_LOCALE = appLocales.includes(navigator.language.split('-')[0])
  ? navigator.language.split('-')[0]
  : 'en'

export const formatTranslationMessages = (locale: string, messages: any): any => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages) : {}

  const flattenFormattedMessages = (formattedMessages: any, key: string) => {
    const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE ? defaultFormattedMessages[key] : messages[key]
    return { ...formattedMessages, [key]: formattedMessage }
  }
  return Object.keys(messages).reduce(flattenFormattedMessages, {})
}

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  de: formatTranslationMessages('de', deTranslationMessages),
}
