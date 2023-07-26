import { defineStore } from 'pinia'
import { ref } from 'vue'
import Api from './api'
import type { RoutesType } from '@/helpers/types/routes'

export const useRoutesStore = defineStore(
  'routes',
  () => {
    const routesPending = ref(false)
    const routesList = ref([] as RoutesType[])

    const getRoutesAction = async (userId: string | null) => {
      if (!userId) {
        return { success: false }
      }
      routesPending.value = true
      const response = await Api.getRoutesAction(userId)
      routesList.value = response.routes
      routesPending.value = false
      return response
    }

    return {
      routesPending,
      routesList,
      getRoutesAction,
    }
  },
  {
    persist: {
      paths: ['routesPending', 'routesList'],
    },
  },
)
