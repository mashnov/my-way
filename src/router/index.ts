import { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import AboutRoutes from './routes/about'
import MainRoutes from './routes/main'

import guards from './guards'

const routes: RouteRecordRaw[] = [...AboutRoutes, ...MainRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => guards({ to, from, next }))

export { router }
