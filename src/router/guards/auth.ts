import type { Guard } from '@/helpers/types/router'

import { useAuthStore } from '@/stores/auth/store'

const getIsAuthorised = () => {
  const authStore = useAuthStore()
  return authStore?.isAuthed
}

export const requiresUnauthorized = ({ to }: Guard) => {
  const requiresUnauthorized = to?.meta?.requiresUnauthorized
  const isAuthorised = getIsAuthorised()
  return (requiresUnauthorized && !isAuthorised) || !requiresUnauthorized
}

export const requiresAuthorized = ({ to }: Guard) => {
  const requiresAuthorized = to?.meta?.requiresAuthorized
  const isAuthorised = getIsAuthorised()
  return (requiresAuthorized && isAuthorised) || !requiresAuthorized
}
