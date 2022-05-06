import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentChatState, userState } from '../../atoms'
import { db } from '../../firebase.config'
import { Chat, Message } from '../../types'
import MediaFile from './MediaFile'

const MessageContainer = () => {
  const [currentChat, setCurrentChat] = useRecoilState(currentChatState)

  const [messages, setMessages] = useState<Message[] | []>([])

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, `chats/${currentChat?.id}/messages`),
          orderBy('timestamp', 'asc')
        ),
        async (snapshot) => {
          let messages: Message[] = []
          snapshot.docs.forEach((doc) => messages.push(doc.data() as Message))
          setMessages(messages)
        }
      ),
    []
  )

  return (
    <div className="flex w-full flex-1 cursor-default flex-col space-y-2  overflow-auto bg-sky-500/50 p-2 py-4 scrollbar-none">
      {messages &&
        messages.map((message, idx) => (
          <Message message={message} key={idx + message.timestamp.seconds} />
        ))}
    </div>
  )
}

const Message: React.FC<{ message: Message }> = ({ message }) => {
  const {
    message: text,
    files,
    sender: { name, photoURL, email },
    timestamp,
  } = message
  const self = useRecoilValue(userState)
  return (
    <div
      className={`flex-row-around space-x-2 rounded-md p-2 font-semibold text-black
  ${
    email === self?.email ? 'self-end bg-emerald-400' : 'self-start bg-cyan-400'
  }
  `}
    >
      <img
        src={photoURL || ''}
        alt=""
        className="h-5 w-5 self-start rounded-full"
      />
      {files &&
        files.length &&
        files.map((file, idx) => (
          <div className="flex-col-center">
            <MediaFile url={file} key={idx + 1} />
            <p>{text}</p>
          </div>
        ))}
      {!files.length && (
        <p className="max-w-[160px] text-sm sm:max-w-[60%]">{text}</p>
      )}
      <Moment format="DD-MM-YY" className="self-end text-[10px] text-gray-500">
        {timestamp?.toDate()}
      </Moment>
    </div>
  )
}

export default MessageContainer
