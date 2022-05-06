import { atom } from 'recoil'
import { Chat, User } from './types'

export const userState = atom<User | null>({
  key: 'user',
  default: null,
})

export const modalState = atom<boolean>({
  key: 'modal',
  default: false,
})

export const uploadModalState = atom<boolean>({
  key: 'uploadModal',
  default: false,
})

export const chatState = atom<User[]>({
  key: 'chatUsers',
  default: [],
})

export const currentChatState = atom<Chat | null>({
  key: 'currentChat',
  default: null,
})

export const siderbarState = atom<boolean>({
  key: 'showSiderbar',
  default: false,
})
