import { EmojiHappyIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import React, { FormEvent, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentChatState, uploadModalState, userState } from '../../atoms'
import { db } from '../../firebase.config'
import TextArea from 'react-textarea-autosize'
import { UploadIcon } from '@heroicons/react/outline'
import FileUploadModal from './FileUploadModal'
const MessageInput = () => {
  const [message, setMessage] = useState<string | null>()
  const [showUploadModal, setShowUploadModal] = useRecoilState(uploadModalState)
  const currentChat = useRecoilValue(currentChatState)
  const self = useRecoilValue(userState)

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault()
    if (!message?.trim()) return
    if (currentChat) {
      await addDoc(collection(db, `chats/${currentChat.id}/messages`), {
        message: message,
        sender: self,
        timestamp: serverTimestamp(),
      })
      setMessage('')
    }
  }

  return (
    <>
      <form
        onSubmit={sendMessage}
        className="flex-row-between w-full space-x-2 bg-[#df465d] px-2 py-4"
        onClick={(e) => {
          setShowUploadModal(false)
        }}
      >
        <UploadIcon
          className="icon bg-blue-500 text-amber-500 transition hover:scale-105 hover:bg-emerald-500"
          onClick={(e) => {
            e.stopPropagation()
            setShowUploadModal((p) => !p)
          }}
        />
        <EmojiHappyIcon className="icon absolute right-16 p-0 text-yellow-400" />
        <TextArea
          placeholder="Text Message..."
          value={message || ''}
          maxRows={10}
          onChange={(e) => setMessage(e.target.value)}
          className=" min-h-fit flex-1 rounded-md px-1 py-2 pr-10 text-gray-600 outline-none scrollbar-none sm:font-semibold"
        />
        <ChevronRightIcon
          className="icon bg-gray-500 transition hover:scale-105 hover:bg-emerald-500"
          onClick={sendMessage}
        />
      </form>
      {showUploadModal && <FileUploadModal />}
    </>
  )
}

export default MessageInput
