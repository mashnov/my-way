import { Paths, Names } from '@/helpers/enum/router'

import AuthRoute from './auth'
import ProfileRoute from './profile'
import PlacesRoute from './places'
import RoutesRoute from './routes'
import ViewerRoute from './viewer'
import ErrorRoute from './error'

const routes = [
  {
    path: Paths.MAIN,
    name: Names.MAIN,
    redirect: { name: AuthRoute.name },
    component: () => import('@/views/main/MainView.vue'),
    children: [AuthRoute, ProfileRoute, PlacesRoute, RoutesRoute, ViewerRoute, ErrorRoute],
  },
]

export default routes
