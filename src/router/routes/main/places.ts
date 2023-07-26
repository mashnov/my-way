import { Paths, Names } from '@/helpers/enum/router'

export default {
  path: Paths.PLACES,
  name: Names.PLACES,
  props: { name: Names.PLACES },
  redirect: { name: Names.PLACES_LIST },
  meta: { requiresAuthorized: true },
  component: () => import('@/views/main/PlacesView.vue'),
  children: [
    {
      path: Paths.PLACES_LIST,
      name: Names.PLACES_LIST,
      props: { name: Names.PLACES_LIST },
      meta: { requiresAuthorized: true },
      component: () => import('@/views/main/PlacesView.vue'),
    },
    {
      path: Paths.PLACES_ADD,
      name: Names.PLACES_ADD,
      props: { name: Names.PLACES_ADD },
      meta: { requiresAuthorized: true },
      component: () => import('@/views/main/PlacesView.vue'),
    },
    {
      path: Paths.PLACES_DETAILS,
      name: Names.PLACES_DETAILS,
      props: { name: Names.PLACES_DETAILS },
      meta: { requiresAuthorized: true },
      component: () => import('@/views/main/PlacesView.vue'),
    },
  ],
}
