import type { emailValidatorType, passwordValidatorType } from '@/helpers/types/helpers'

const stringIsEmail = (value: string): boolean => {
  return /\S+@\S+\.\S+/.test(value)
}

const stringContainNumberCharacter = (value: string): boolean => {
  return /\d+/.test(value)
}

const stringContainSpecialCharacter = (value: string): boolean => {
  return /[^a-zA-Z0-9]/.test(value)
}

const stringContainUpperCharacter = (value: string): boolean => {
  return /[A-Z]/.test(value)
}

export const emailValidator = (value: string): emailValidatorType => ({
  email: stringIsEmail(value),
  count: value.length > 5,
})

export const passwordValidator = (value: string): passwordValidatorType => ({
  number: stringContainNumberCharacter(value),
  special: stringContainSpecialCharacter(value),
  upper: stringContainUpperCharacter(value),
  count: value.length > 5,
})
