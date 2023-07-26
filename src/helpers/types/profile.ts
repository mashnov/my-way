export type ProfileType = {
  userId: string
  userLogo: string
  userName: string
  userEmail: string
  emailIsSend: boolean
  emailVerified: boolean
}

export type UpdateType = {
  displayName?: string
  photoURL?: string
}

export type EmailType = {
  email: string
}

export type PasswordType = {
  password: string
}

export type ProfileResponseType = {
  success: boolean
  profile: ProfileType | null
  message?: string | null
}
