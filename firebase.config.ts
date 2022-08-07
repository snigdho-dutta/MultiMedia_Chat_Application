// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
const appName = process.env.NEXT_PUBLIC_FIREBASE_APP_NAME
const senderId = process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID
console.log(senderId, appName, apiKey)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: `${appName}.firebaseapp.com`,
  projectId: `${appName}`,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: `${senderId}`,
  appId: `1:${senderId}:web:0ab4499f17b4dda4aa34ea`,
}

// Initialize Firebase
const app = getApps()?.length ? getApp() : initializeApp(firebaseConfig)

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
