import { getAuth } from 'firebase/auth'
import { reauthenticateWithCredential } from 'firebase/auth'
import { reauthenticateWithPopup } from 'firebase/auth'
import { signInWithPopup } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { sendPasswordResetEmail } from 'firebase/auth'
import { signOut } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import { EmailAuthProvider } from 'firebase/auth'
import type { LoginType } from '@/helpers/types/auth'
import type { ReAuthApiType } from '@/helpers/types/auth'
import type { RegisterType } from '@/helpers/types/auth'
import type { ForgotType } from '@/helpers/types/auth'
import type { ResponseType } from '@/helpers/types/api'
import type { ProviderType } from '@/helpers/types/auth'

import { app } from '@/helpers/plugins/firebase'
import { providerTransformer } from '@/helpers/transformers/auth'
import { Providers } from '@/helpers/enum/auth'

const authAction = async (): Promise<ResponseType> => {
  try {
    const auth = getAuth(app)
    await auth?.currentUser?.reload()
    const currentUser = auth?.currentUser
    return { success: Boolean(currentUser), response: currentUser }
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : null }
  }
}
const getAuthProvider = async (): Promise<ProviderType> => {
  try {
    const auth = getAuth(app)
    await auth?.currentUser?.reload()
    const currentUser = auth?.currentUser
    const provider = providerTransformer(currentUser || null)
    return { success: Boolean(currentUser), provider }
  } catch (error) {
    return { success: false, provider: null, message: error instanceof Error ? error.message : null }
  }
}
const reAuthAction = async (options: ReAuthApiType): Promise<ResponseType> => {
  const isGoogleProvider = options.provider === Providers.GOOGLE
  const isEmailProvider = options.provider === Providers.EMAIL
  const auth = getAuth(app)
  const currentUser = auth?.currentUser
  const currentEmail = auth?.currentUser?.email
  const password = options.password
  if (!currentUser || !currentEmail) {
    return { success: false }
  } else if (isGoogleProvider) {
    const credential = new GoogleAuthProvider()
    const response = await reauthenticateWithPopup(currentUser, credential)
    return { success: Boolean(response) }
  } else if (isEmailProvider && password) {
    const credential = EmailAuthProvider.credential(currentEmail, password)
    const response = await reauthenticateWithCredential(currentUser, credential)
    return { success: Boolean(response) }
  } else {
    return { success: true }
  }
}
const googleAction = async (): Promise<ResponseType> => {
  try {
    const auth = getAuth(app)
    const googleAuthProvider = new GoogleAuthProvider()
    await signInWithPopup(auth, googleAuthProvider)
    const currentUser = auth?.currentUser
    return { success: Boolean(currentUser), response: currentUser }
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : null }
  }
}
const loginAction = async (options: LoginType): Promise<ResponseType> => {
  try {
    const auth = getAuth(app)
    await signInWithEmailAndPassword(auth, options.username, options.password)
    const currentUser = auth?.currentUser
    return { success: Boolean(currentUser), response: currentUser }
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : null }
  }
}
const registerAction = async (options: RegisterType): Promise<ResponseType> => {
  try {
    const auth = getAuth(app)
    await createUserWithEmailAndPassword(auth, options.username, options.password)
    const currentUser = auth?.currentUser
    return { success: Boolean(currentUser), response: currentUser }
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : null }
  }
}
const forgotAction = async (options: ForgotType): Promise<ResponseType> => {
  try {
    const auth = getAuth(app)
    await sendPasswordResetEmail(auth, options.username)
    return { success: true }
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : null }
  }
}
const logoutAction = async (): Promise<ResponseType> => {
  try {
    const auth = getAuth(app)
    await signOut(auth)
    return { success: true }
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : null }
  }
}

export default {
  authAction,
  getAuthProvider,
  reAuthAction,
  googleAction,
  loginAction,
  registerAction,
  forgotAction,
  logoutAction,
}
