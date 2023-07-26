import { Paths, Names } from '@/helpers/enum/router'

export default {
  path: Paths.AUTH,
  name: Names.AUTH,
  redirect: { name: Names.AUTH_LOGIN },
  children: [
    {
      path: Paths.AUTH_LOGIN,
      name: Names.AUTH_LOGIN,
      props: { name: Names.AUTH_LOGIN },
      meta: { requiresUnauthorized: true },
      component: () => import('@/views/main/AuthView.vue'),
    },
    {
      path: Paths.AUTH_REGISTER,
      name: Names.AUTH_REGISTER,
      props: { name: Names.AUTH_REGISTER },
      meta: { requiresUnauthorized: true },
      component: () => import('@/views/main/AuthView.vue'),
    },
    {
      path: Paths.AUTH_FORGOT,
      name: Names.AUTH_FORGOT,
      props: { name: Names.AUTH_FORGOT },
      meta: { requiresUnauthorized: true },
      component: () => import('@/views/main/AuthView.vue'),
    },
    {
      path: Paths.AUTH_LOGOUT,
      name: Names.AUTH_LOGOUT,
      props: { name: Names.AUTH_LOGOUT },
      meta: { requiresAuthorized: true },
      component: () => import('@/views/main/AuthView.vue'),
    },
  ],
}
