import { onValue, ref } from 'firebase/database'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { useRecoilState, useRecoilValue } from 'recoil'
import { chatState, currentChatState, userState } from '../../atoms'
import { realDb } from '../../firebase.config'
import { Status, User } from '../../types'
import { getChatUsers, getCurrentChat } from '../../utils/chats'

const ChatList = () => {
  const [chatUsers, setChatUsers] = useRecoilState(chatState)
  const user = useRecoilValue(userState)
  useEffect(() => {
    if (user?.email) {
      getChatUsers(user.email).then((users) => setChatUsers(users))
    }
  }, [])

  return (
    <div className="flex-col-around flex-1 overflow-y-auto bg-teal-500">
      {chatUsers.map((chatUser) => (
        <ChatItem key={chatUser.uid} user={chatUser} />
      ))}
    </div>
  )
}

const ChatItem: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter()
  const [currentChat, setCurrentChat] = useRecoilState(currentChatState)
  const [status, setStatus] = useState<Status>()
  useEffect(
    () =>
      onValue(ref(realDb, `status/${user.uid}`), (snapshot) => {
        const data = snapshot.val() as Status
        setStatus(data)
      }),

    []
  )
  const self = useRecoilValue(userState)

  return (
    <div
      className="flex-row-between group w-full bg-white text-sm font-bold text-gray-700 hover:bg-rose-300 sm:text-sm md:text-base"
      onClick={() => {
        if (self?.email && user.email) {
          if (!currentChat?.users?.includes(user.email)) {
            getCurrentChat([self.email, user.email]).then((currentChat) => {
              setCurrentChat(currentChat)
            })
          }
        }
      }}
    >
      <img
        src={
          user.photoURL ||
          'https://image.shutterstock.com/image-vector/social-member-vector-icon-person-260nw-1139787308.jpg'
        }
        alt={user.name || 'user-avatar'}
        className={`icon h-12 w-12  object-cover object-center
        ${status?.state === 'online' ? 'bg-emerald-500' : 'bg-gray-500'}
        `}
      />
      <p className="overflow-x-auto whitespace-nowrap scrollbar-none">
        {user.name}
      </p>
      <div className="flex-col-between text-center text-xs font-normal">
        {status &&
          (status.state === 'offline' ? (
            <>
              <p>Last Seen</p>
              <Moment fromNow className="font-semibold">
                {new Date(status?.last_changed)}
              </Moment>
            </>
          ) : (
            <p>Active Now</p>
          ))}
      </div>
    </div>
  )
}

export default ChatList
