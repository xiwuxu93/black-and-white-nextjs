import { en } from './en'
import { es } from './es'

const dictionaries = {
  en,
  es
}

export type Locale = keyof typeof dictionaries
export type Dictionary = typeof en | typeof es

export const getDictionary = (locale: string): Dictionary => {
  return dictionaries[locale as Locale] || dictionaries.en
}
