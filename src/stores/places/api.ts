import { query, where, getDocs, collection } from 'firebase/firestore'
import { dataBase } from '@/helpers/plugins/firebase'
import type { PlacesType, PlacesResponseType } from '@/helpers/types/places'

const placesCollection = collection(dataBase, 'places').withConverter({
  toFirestore: (modelObject: PlacesType) => modelObject,
  fromFirestore: (snapshot) => snapshot.data() as PlacesType,
})

const getPlacesAction = async (userId: string): Promise<PlacesResponseType> => {
  const userQuery = query(placesCollection, where('uid', '==', userId))
  const snapshot = await getDocs(userQuery)
  const places = snapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  }))

  return {
    places,
    success: true,
  }
}

export default {
  getPlacesAction,
}
