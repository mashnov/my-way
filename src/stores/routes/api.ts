import { query, where, getDocs, collection } from 'firebase/firestore'
import { dataBase } from '@/helpers/plugins/firebase'
import { Collections } from '@/helpers/enum/firebase'
import type { RoutesType, RoutesResponseType } from '@/helpers/types/routes'

const placesCollection = collection(dataBase, Collections.ROUTES).withConverter({
  toFirestore: (modelObject: RoutesType) => modelObject,
  fromFirestore: (snapshot) => snapshot.data() as RoutesType,
})

const getRoutesAction = async (userId: string): Promise<RoutesResponseType> => {
  const userQuery = query(placesCollection, where('uid', '==', userId))
  const snapshot = await getDocs(userQuery)
  const routes = snapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  }))

  return {
    routes,
    success: true,
  }
}

export default {
  getRoutesAction,
}
