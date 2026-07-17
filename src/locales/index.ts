import { en } from './en'

const dictionaries = {
  en
}

export type Locale = keyof typeof dictionaries

export const getDictionary = (locale: string) => {
  return dictionaries[locale as Locale] || dictionaries.en
}
