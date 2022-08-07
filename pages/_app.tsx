import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth, db } from '../firebase.config'
import { RecoilRoot } from 'recoil'
import { User } from '../types'
import Login from '../components/Home/Login'
import Loader from '../components/Loader'
import { userState } from '../atoms'
import { setDoc, doc } from 'firebase/firestore'
import updateStatus from '../utils/realtimeUpdate'

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const {
            displayName: name,
            email,
            uid,
            photoURL,
            metadata: { lastSignInTime: lastActive },
          } = user
          const usersRef = doc(db, 'users', uid)
          setDoc(usersRef, { name, email, uid, photoURL, lastActive })
          updateStatus(uid)
          setUser({ name, email, uid, photoURL, lastActive })
        } else {
          setUser(null)
        }
        setLoading(false)
      }),
    []
  )
  if (loading) return <Loader />
  // if (!user) return <Login />

  return (
    <RecoilRoot
      initializeState={({ set }) => {
        set(userState, user)
      }}
    >
      {user ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Login />
      )}
    </RecoilRoot>
  )
}
const EmptyLayout: React.FC = ({ children }) => <>{children}</>
export default MyApp
