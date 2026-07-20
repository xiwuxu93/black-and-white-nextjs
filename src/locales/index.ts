import { en } from './en'
import { es } from './es'
import { de } from './de'

const dictionaries = {
  en,
  es,
  de
}

export type Locale = keyof typeof dictionaries
export type Dictionary = typeof en | typeof es | typeof de

export const getDictionary = (locale: string): Dictionary => {
  return dictionaries[locale as Locale] || dictionaries.en
}
