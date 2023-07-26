import { Keys } from '@/helpers/enum/storage'

export type emailValidatorType = {
  email: boolean
  count: boolean
}

export type passwordValidatorType = {
  number: boolean
  special: boolean
  upper: boolean
  count: boolean
}

export type localStorageSetType = {
  hours?: number
  key: Keys
  userId: string
  value: string | number | boolean | object
}

export type localStorageGetType = {
  key: Keys
  userId: string
}
