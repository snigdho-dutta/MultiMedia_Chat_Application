import {
  getDatabase,
  onDisconnect,
  serverTimestamp,
  ref,
  set,
  onValue,
} from 'firebase/database'
import { realDb } from '../firebase.config'
import { Status } from '../types'

const updateStatus = (uid: string) => {
  const userStatusRef = ref(realDb, `status/${uid}`)
  const con = ref(realDb, '.info/connected')

  onValue(con, (snapshot) => {
    if (snapshot.val() == false) {
      return
    }
    onDisconnect(userStatusRef).set({
      state: 'offline',
      last_changed: serverTimestamp(),
    })
    set(userStatusRef, {
      state: 'online',
      last_changed: serverTimestamp(),
    })
  })
}



export default updateStatus
