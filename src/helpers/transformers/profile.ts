import { getLocalStorageValue } from '@/helpers/functions/storage'
import { Keys } from '@/helpers/enum/storage'

import type { User } from 'firebase/auth'
import type { ProfileType } from '@/helpers/types/profile'

export const profileTransformer = (userData: User | null): ProfileType => {
  const userId = userData?.uid || ''
  const emailIsSend = getLocalStorageValue({ key: Keys.EMAIL_CONFIRMATION, userId })

  return {
    userId,
    userLogo: userData?.photoURL || '',
    userName: userData?.displayName || '',
    userEmail: userData?.email || '',
    emailIsSend,
    emailVerified: !!userData?.emailVerified,
  }
}
