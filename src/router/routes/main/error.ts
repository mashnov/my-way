import { Paths, Names } from '@/helpers/enum/router'

export default {
  path: Paths.ERROR,
  name: Names.ERROR,
  component: () => import('@/views/main/ErrorView.vue'),
}
