import { getAuth } from 'firebase/auth'
import { updateProfile } from 'firebase/auth'
import { updateEmail } from 'firebase/auth'
import { updatePassword } from 'firebase/auth'
import { sendEmailVerification } from 'firebase/auth'
import { deleteUser } from 'firebase/auth'

import { app } from '@/helpers/plugins/firebase'
import { Keys } from '@/helpers/enum/storage'
import { setLocalStorageValue } from '@/helpers/functions/storage'
import { removeLocalStorageValue } from '@/helpers/functions/storage'
import { profileTransformer } from '@/helpers/transformers/profile'

import type { UpdateType } from '@/helpers/types/profile'
import type { EmailType } from '@/helpers/types/profile'
import type { PasswordType } from '@/helpers/types/profile'
import type { ProfileResponseType } from '@/helpers/types/profile'
import type { ResponseType } from '@/helpers/types/api'

const getProfileAction = async (): Promise<ProfileResponseType> => {
  try {
    const auth = getAuth(app)
    await auth?.currentUser?.reload()
    const currentUser = auth?.currentUser
    const profile = profileTransformer(currentUser || null)
    return { success: Boolean(currentUser), profile }
  } catch (error) {
    return { success: false, profile: null, message: error instanceof Error ? error.message : null }
  }
}
const updateProfileAction = async (options: UpdateType): Promise<ResponseType> => {
  try {
    const auth = getAuth(app)
    const { currentUser } = auth
    if (!currentUser) {
      return { success: false }
    }
    await updateProfile(currentUser, options)
    return { success: true }
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : null }
  }
}
const updateEmailAction = async (options: EmailType): Promise<ResponseType> => {
  try {
    const auth = getAuth(app)
    const { currentUser } = auth
    if (!currentUser) {
      return { success: false }
    }
    const userId = currentUser?.uid
    await updateEmail(currentUser, options.email)
    removeLocalStorageValue({ key: Keys.EMAIL_CONFIRMATION, userId })
    return { success: true }
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : null }
  }
}
const confirmEmailAction = async (): Promise<ResponseType> => {
  try {
    const auth = getAuth(app)
    const { currentUser } = auth
    if (!currentUser) {
      return { success: false }
    }
    const userId = currentUser?.uid
    await sendEmailVerification(currentUser)
    setLocalStorageValue({ key: Keys.EMAIL_CONFIRMATION, userId, value: true })
    return { success: true }
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : null }
  }
}
const updatePasswordAction = async (options: PasswordType): Promise<ResponseType> => {
  try {
    const auth = getAuth(app)
    const { currentUser } = auth
    if (!currentUser) {
      return { success: false }
    }
    await updatePassword(currentUser, options.password)
    return { success: true }
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : null }
  }
}
const deleteAccountAction = async (): Promise<ResponseType> => {
  try {
    const auth = getAuth(app)
    const { currentUser } = auth
    if (!currentUser) {
      return { success: false }
    }
    await deleteUser(currentUser)
    return { success: true }
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : null }
  }
}

export default {
  getProfileAction,
  updateProfileAction,
  updateEmailAction,
  updatePasswordAction,
  confirmEmailAction,
  deleteAccountAction,
}
