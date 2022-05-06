import { Timestamp } from 'firebase/firestore'

export type User = {
  name: string | null | undefined
  email: string | null | undefined
  lastActive: string | undefined
  photoURL: string | null | undefined
  uid: string
}

export type Status = {
  state: 'offline' | 'online'
  last_changed: number
}

export type Message = {
  message: string
  files: string[]
  timestamp: Timestamp
  sender: User
}

export type Chat = {
  id: string
  users: string[]
  messages: Message[]
}

export type FilesState = {
  files: File[]
  previews: string[]
}
