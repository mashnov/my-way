import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBxhJ4W-1e9MMtED2DLaDJdaWOa8ZHh73s',
  authDomain: 'my-way-local.firebaseapp.com',
  projectId: 'my-way-local',
  storageBucket: 'my-way-local.appspot.com',
  messagingSenderId: '592102480937',
  appId: '1:592102480937:web:8f88ca37adb5b78c8f5038',
}

const app = initializeApp(firebaseConfig)
const dataBase = getFirestore(app)

const init = (callback: () => void) => {
  getAuth(app).onAuthStateChanged(callback)
}

export { init, app, dataBase }
