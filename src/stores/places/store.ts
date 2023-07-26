import { defineStore } from 'pinia'
import { ref } from 'vue'
import Api from './api'

import { PlacesType } from '@/helpers/types/places'

export const usePlacesStore = defineStore(
  'places',
  () => {
    const placesPending = ref(false)
    const placesList = ref([] as PlacesType[])

    const getPlacesAction = async (userId: string | null) => {
      if (!userId) {
        return { success: false }
      }
      placesPending.value = true
      const response = await Api.getPlacesAction(userId)
      placesList.value = response.places
      placesPending.value = false
      return response
    }

    return {
      placesPending,
      placesList,
      getPlacesAction,
    }
  },
  {
    persist: {
      paths: ['placesPending', 'placesList'],
    },
  },
)
