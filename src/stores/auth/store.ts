import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Providers } from '@/helpers/enum/auth'
import type { LoginType } from '@/helpers/types/auth'
import type { ReAuthType } from '@/helpers/types/auth'
import type { RegisterType } from '@/helpers/types/auth'
import type { ForgotType } from '@/helpers/types/auth'
import Api from './api'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const authPending = ref(false)
    const reAuthPending = ref(false)
    const googlePending = ref(false)
    const loginPending = ref(false)
    const registerPending = ref(false)
    const forgotPending = ref(false)
    const logoutPending = ref(false)

    const authIsPending = computed(
      () =>
        authPending.value ||
        reAuthPending.value ||
        googlePending.value ||
        loginPending.value ||
        registerPending.value ||
        forgotPending.value ||
        logoutPending.value,
    )

    const providerName = ref<Providers | null>(null)
    const googleProvider = computed(() => providerName.value === Providers.GOOGLE)
    const emailProvider = computed(() => providerName.value === Providers.EMAIL)
    const isAuthed = computed(() => Boolean(providerName.value))

    const authAction = async () => {
      authPending.value = true
      const response = await Api.authAction()
      await getAuthProvider()
      authPending.value = false
      return response
    }
    const getAuthProvider = async () => {
      authPending.value = true
      const response = await Api.getAuthProvider()
      providerName.value = response.provider
      authPending.value = false
      return response
    }
    const reAuthAction = async (options: ReAuthType) => {
      const provider = providerName.value
      if (!provider) {
        return { success: false }
      }
      reAuthPending.value = true
      const response = Api.reAuthAction({ ...options, provider })
      reAuthPending.value = false
      return response
    }
    const googleAction = async () => {
      googlePending.value = true
      const response = await Api.googleAction()
      await getAuthProvider()
      googlePending.value = false
      return response
    }
    const loginAction = async (options: LoginType) => {
      loginPending.value = true
      const response = await Api.loginAction(options)
      await getAuthProvider()
      loginPending.value = false
      return response
    }
    const registerAction = async (options: RegisterType) => {
      registerPending.value = true
      const response = await Api.registerAction(options)
      await getAuthProvider()
      registerPending.value = false
      return response
    }
    const forgotAction = async (options: ForgotType) => {
      forgotPending.value = true
      const response = await Api.forgotAction(options)
      forgotPending.value = false
      return response
    }
    const logoutAction = async () => {
      logoutPending.value = true
      const response = await Api.logoutAction()
      await getAuthProvider()
      logoutPending.value = false
      return response
    }

    return {
      providerName,
      authPending,
      googleProvider,
      emailProvider,
      isAuthed,
      googlePending,
      loginPending,
      registerPending,
      forgotPending,
      logoutPending,
      authIsPending,
      authAction,
      getAuthProvider,
      reAuthAction,
      googleAction,
      loginAction,
      registerAction,
      forgotAction,
      logoutAction,
    }
  },
  {
    persist: {
      paths: [
        'providerName',
        'googleProvider',
        'emailProvider',
        'isAuthed',
        'authPending',
        'reAuthPending',
        'googleProvider',
        'emailProvider',
        'googlePending',
        'loginPending',
        'registerPending',
        'forgotPending',
        'logoutPending',
      ],
    },
  },
)
