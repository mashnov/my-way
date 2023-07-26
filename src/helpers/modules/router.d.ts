import type { Meta } from '@/helpers/types/router'

declare module 'vue-router' {
  interface RouteMeta extends Meta {}
}
