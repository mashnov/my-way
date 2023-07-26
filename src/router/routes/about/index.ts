import { Paths, Names } from '@/helpers/enum/router'

const routes = [
  {
    path: Paths.ABOUT,
    name: Names.ABOUT,
    component: () => import('@/views/about/AboutView.vue'),
  },
]

export default routes
