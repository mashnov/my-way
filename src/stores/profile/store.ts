import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Api from './api'
import type { UpdateType } from '@/helpers/types/profile'
import type { EmailType } from '@/helpers/types/profile'
import type { PasswordType } from '@/helpers/types/profile'

export const useProfileStore = defineStore(
  'profile',
  () => {
    const getProfilePending = ref(false)
    const updateProfilePending = ref(false)
    const updateEmailPending = ref(false)
    const confirmEmailPending = ref(false)
    const updatePasswordPending = ref(false)
    const deleteAccountPending = ref(false)

    const profileIsPending = computed(
      () =>
        getProfilePending.value ||
        updateProfilePending.value ||
        updateEmailPending.value ||
        confirmEmailPending.value ||
        updatePasswordPending.value ||
        deleteAccountPending.value,
    )

    const userId = ref<string | null>(null)
    const userLogo = ref<string | null>(null)
    const userName = ref<string | null>(null)
    const userEmail = ref<string | null>(null)
    const emailIsSend = ref(false)
    const emailVerified = ref(false)

    const getProfileAction = async () => {
      getProfilePending.value = true
      const response = await Api.getProfileAction()
      if (response.success) {
        userId.value = response.profile?.userId || null
        userLogo.value = response.profile?.userLogo || null
        userName.value = response.profile?.userName || null
        userEmail.value = response.profile?.userEmail || null
        emailIsSend.value = Boolean(response.profile?.emailIsSend)
        emailVerified.value = Boolean(response.profile?.emailVerified)
      }
      getProfilePending.value = false
      return response
    }
    const updateProfileAction = async (options: UpdateType) => {
      updateProfilePending.value = true
      const response = await Api.updateProfileAction(options)
      updateProfilePending.value = false
      return response
    }
    const updateEmailAction = async (options: EmailType) => {
      updateEmailPending.value = true
      const response = await Api.updateEmailAction(options)
      updateEmailPending.value = false
      return response
    }
    const confirmEmailAction = async () => {
      confirmEmailPending.value = true
      const response = await Api.confirmEmailAction()
      confirmEmailPending.value = false
      return response
    }
    const updatePasswordAction = async (options: PasswordType) => {
      updatePasswordPending.value = true
      const response = await Api.updatePasswordAction(options)
      updatePasswordPending.value = false
      return response
    }
    const deleteAccountAction = async () => {
      deleteAccountPending.value = true
      const response = await Api.deleteAccountAction()
      deleteAccountPending.value = false
      return response
    }

    const logoutAction = () => {
      userId.value = ''
      userLogo.value = ''
      userName.value = ''
      userEmail.value = ''
      emailIsSend.value = false
      emailVerified.value = false
      return { success: true }
    }

    return {
      getProfilePending,
      updateProfilePending,
      updateEmailPending,
      updatePasswordPending,
      confirmEmailPending,
      deleteAccountPending,
      profileIsPending,
      userId,
      userLogo,
      userName,
      userEmail,
      emailIsSend,
      emailVerified,
      getProfileAction,
      updateProfileAction,
      updateEmailAction,
      confirmEmailAction,
      updatePasswordAction,
      deleteAccountAction,
      logoutAction,
    }
  },
  {
    persist: {
      paths: [
        'getProfilePending',
        'updateProfilePending',
        'updateEmailPending',
        'confirmEmailPending',
        'updatePasswordPending',
        'deleteAccountPending',
        'profileIsPending',
        'userId',
        'userLogo',
        'userName',
        'userEmail',
        'emailIsSend',
        'emailVerified',
      ],
    },
  },
)
