import { Paths, Names } from '@/helpers/enum/router'

export default {
  path: Paths.ROUTES,
  name: Names.ROUTES,
  props: { name: Names.ROUTES },
  redirect: { name: Names.ROUTES_LIST },
  meta: { requiresAuthorized: true },
  component: () => import('@/views/main/RoutesView.vue'),
  children: [
    {
      path: Paths.ROUTES_LIST,
      name: Names.ROUTES_LIST,
      props: { name: Names.ROUTES_LIST },
      meta: { requiresAuthorized: true },
      component: () => import('@/views/main/RoutesView.vue'),
    },
    {
      path: Paths.ROUTES_ADD,
      name: Names.ROUTES_ADD,
      props: { name: Names.ROUTES_ADD },
      meta: { requiresAuthorized: true },
      component: () => import('@/views/main/RoutesView.vue'),
    },
    {
      path: Paths.ROUTES_DETAILS,
      name: Names.ROUTES_DETAILS,
      props: { name: Names.ROUTES_DETAILS },
      meta: { requiresAuthorized: true },
      component: () => import('@/views/main/RoutesView.vue'),
    },
  ],
}
