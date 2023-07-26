import { Providers } from '@/helpers/enum/auth'

export type LoginType = {
  username: string
  password: string
}

export type ReAuthType = {
  password?: string
}

export type ReAuthApiType = ReAuthType & {
  provider: string
}

export type RegisterType = {
  username: string
  password: string
}

export type ForgotType = {
  username: string
}

export type ProviderType = {
  success: boolean
  provider: Providers | null
  message?: string | null
}
