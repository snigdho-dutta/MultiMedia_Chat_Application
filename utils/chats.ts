import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { Chat, User } from '../types'

export const createChat = async (users: string[]) => {
  const userSnap = await getDocs(
    query(collection(db, 'users'), where('email', '==', users[1]))
  )
  if (!userSnap.empty) {
    const user: User = { ...(userSnap.docs[0].data() as User) }
    const querySnapshot = await getDocs(
      query(collection(db, 'chats'), where('users', 'array-contains', users[0]))
    )
    const chatExits =
      querySnapshot.docs.find((doc) => doc.data().users.includes(users[1])) !=
      undefined
    if (!chatExits) {
      await addDoc(collection(db, 'chats'), { users, messages: [] })
      alert('User added successfully')
    } else {
      alert('User already Added')
    }
  } else {
    alert('User not Found in Firestore')
  }
}

export const getChatUsers = async (email: string) => {
  const querySnapshot = await getDocs(
    query(collection(db, 'users'), where('email', '!=', email))
  )
  let chats: User[] = []
  querySnapshot.docs.forEach((doc) => chats.push(doc.data() as User))
  return chats
}

export const getCurrentChat = async (users: string[]) => {
  const chatsSnap = await getDocs(
    query(collection(db, 'chats'), where('users', 'array-contains', users[0]))
  )

  const currentChat = chatsSnap.docs.find((doc) =>
    doc.data().users.includes(users[1])
  )
  if (!currentChat) {
    return null
  } else {
    return { ...currentChat.data(), id: currentChat.id } as Chat
  }
}

export const sendMessage = async (
  chatId: string,
  sender: User,
  text: string,
  files: string[]
) => {
  await addDoc(collection(db, `chats/${chatId}/messages`), {
    message: text,
    files,
    sender,
    timestamp: serverTimestamp(),
  })
}
