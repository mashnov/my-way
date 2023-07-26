import { Paths, Names } from '@/helpers/enum/router'

export default {
  path: Paths.VIEWER,
  name: Names.VIEWER,
  meta: { requiresAuthorized: true },
  component: () => import('@/views/main/ViewerView.vue'),
}
