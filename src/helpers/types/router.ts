import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export type Guard = {
  to: RouteLocationNormalized
  from: RouteLocationNormalized
  next: NavigationGuardNext
}

export type Meta = {
  requiresAuthorized?: boolean
  requiresUnauthorized?: boolean
}
