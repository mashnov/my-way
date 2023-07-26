import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
}

const app = initializeApp(firebaseConfig)
const dataBase = getFirestore(app)

const init = (callback: () => void) => {
  getAuth(app).onAuthStateChanged(callback)
}

export { init, app, dataBase }
