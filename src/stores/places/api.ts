import { query, where, getDocs, collection } from 'firebase/firestore'
import { doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore'
import { dataBase } from '@/helpers/plugins/firebase'
import { Collections } from '@/helpers/enum/firebase'
import type { NewPlacesType } from '@/helpers/types/places'
import type { PlacesType } from '@/helpers/types/places'
import type { PlacesResponseType } from '@/helpers/types/places'
import type { PlaceUpdateType } from '@/helpers/types/places'

const placesCollection = collection(dataBase, Collections.PLACES).withConverter({
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
const addPlaceAction = async (place: NewPlacesType): Promise<PlaceUpdateType> => {
  await addDoc(collection(dataBase, Collections.PLACES), place)
  return {
    success: true,
  }
}

const updatePlaceAction = async (place: PlacesType): Promise<PlaceUpdateType> => {
  const { id, ...placeOption } = place
  await setDoc(doc(dataBase, Collections.PLACES, id), placeOption)
  return {
    success: true,
  }
}

const deleteAddressHandler = async (place: PlacesType): Promise<PlaceUpdateType> => {
  const placeId = place.id
  await deleteDoc(doc(dataBase, Collections.PLACES, placeId))
  return {
    success: true,
  }
}

export default {
  getPlacesAction,
  addPlaceAction,
  updatePlaceAction,
  deleteAddressHandler,
}
