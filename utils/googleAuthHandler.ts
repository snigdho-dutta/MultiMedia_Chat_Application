import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from 'firebase/auth'

import { auth, provider } from '../firebase.config'

export const googleSignIn = async (): Promise<User> => {
  provider.setCustomParameters({ prompt: 'select_account' })
  const result = await signInWithPopup(auth, provider)
  const credentials = GoogleAuthProvider.credentialFromResult(result)
  const token = credentials?.accessToken
  const user = result.user
  return user
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code
  //       const errorMessage = error.message
  //       // The email of the user's account used.
  //       const email = error.email
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error)
  //       // ...
  //     })
}

export const googleSignOut = () =>
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log('Sign-out successful')
    })
    .catch((error) => {
      // An error happened.
      console.log(error)
    })
