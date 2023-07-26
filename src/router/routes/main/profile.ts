import { Paths, Names } from '@/helpers/enum/router'

export default {
  path: Paths.PROFILE,
  name: Names.PROFILE,
  props: { name: Names.PROFILE },
  redirect: { name: Names.ACCOUNT },
  meta: { requiresAuthorized: true },
  component: () => import('@/views/main/ProfileView.vue'),
  children: [
    {
      path: Paths.ACCOUNT,
      name: Names.ACCOUNT,
      props: { name: Names.ACCOUNT },
      meta: { requiresAuthorized: true },
      component: () => import('@/views/main/ProfileView.vue'),
    },
    {
      path: Paths.EMAIL,
      name: Names.EMAIL,
      props: { name: Names.EMAIL },
      meta: { requiresAuthorized: true },
      component: () => import('@/views/main/ProfileView.vue'),
    },
    {
      path: Paths.PASSWORD,
      name: Names.PASSWORD,
      props: { name: Names.PASSWORD },
      meta: { requiresAuthorized: true },
      component: () => import('@/views/main/ProfileView.vue'),
    },
  ],
}
