import { defineStore } from 'pinia'
import { ref } from 'vue'
import Api from './api'

import { NewPlacesType } from '@/helpers/types/places'
import { PlacesType } from '@/helpers/types/places'

export const usePlacesStore = defineStore(
  'places',
  () => {
    const placesPending = ref(false)
    const addAddressPending = ref(false)
    const updateAddressPending = ref(false)
    const deleteAddressPending = ref(false)
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

    const addPlaceAction = async (place: NewPlacesType) => {
      addAddressPending.value = true
      const response = await Api.addPlaceAction(place)
      addAddressPending.value = false
      return response
    }

    const updatePlaceAction = async (place: PlacesType) => {
      updateAddressPending.value = true
      const response = await Api.updatePlaceAction(place)
      updateAddressPending.value = false
      return response
    }

    const deleteAddressHandler = async (place: PlacesType) => {
      deleteAddressPending.value = true
      const response = await Api.deleteAddressHandler(place)
      deleteAddressPending.value = false
      return response
    }

    return {
      placesPending,
      addAddressPending,
      updateAddressPending,
      deleteAddressPending,
      placesList,
      getPlacesAction,
      addPlaceAction,
      updatePlaceAction,
      deleteAddressHandler,
    }
  },
  {
    persist: {
      paths: ['placesPending', 'addAddressPending', 'updateAddressPending', 'deleteAddressPending', 'placesList'],
    },
  },
)
