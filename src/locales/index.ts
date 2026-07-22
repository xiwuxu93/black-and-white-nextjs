import { en } from './en'
import { es } from './es'
import { de } from './de'
import { ja } from './ja'

const dictionaries = {
  en,
  es,
  de,
  ja
}

export type Locale = keyof typeof dictionaries
export type Dictionary = typeof en | typeof es | typeof de | typeof ja

export const getDictionary = (locale: string): Dictionary => {
  return dictionaries[locale as Locale] || dictionaries.en
}
