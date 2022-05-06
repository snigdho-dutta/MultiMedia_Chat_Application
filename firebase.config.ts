// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDEpWmrpMSaqniPZB3eAE68N5WdNtwjnhU',
  authDomain: 'next-watsapp.firebaseapp.com',
  projectId: 'next-watsapp',
  storageBucket: 'next-watsapp.appspot.com',
  messagingSenderId: '376310799199',
  appId: '1:376310799199:web:0ab4499f17b4dda4aa34ea',
}

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db = getFirestore(app)

const realDb = getDatabase(
  app,
  'https://next-watsapp-default-rtdb.asia-southeast1.firebasedatabase.app'
)

const storage = getStorage()

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({ prompt: 'select_account' })

export default app

export { db, auth, realDb, provider, storage }
