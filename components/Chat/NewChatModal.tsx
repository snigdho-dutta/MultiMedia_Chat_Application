import { UserIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { userState } from '../../atoms'
import { createChat } from '../../utils/chats'

const NewChatModal = () => {
  const user = useRecoilValue(userState)
  const [email, setEmail] = useState<string>('')
  const addNewChat = () => {
    if (user?.email && !!email.trim() && user.email !== email) {
      createChat([user.email, email])
    } else alert('Enter Valid Email')
  }
  return (
    <div className="box-shadow flex-col-center absolute h-[15rem] w-10/12 max-w-md space-y-3 rounded-lg bg-gradient-to-br from-red-500 to-rose-200">
      <div className="flex-row-center w-full space-x-2 text-emerald-500">
        <UserIcon className="icon bg-gray-500" />
        <input
          type="email"
          required={true}
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[80%] rounded bg-white/50 p-1 text-lg font-semibold tracking-wide  outline-none ring-inset ring-teal-500 ring-opacity-50 focus:text-gray-500 focus:ring"
        />
      </div>
      <button
        className="hover:box-shadow rounded-md bg-cyan-500/50 px-2 py-1 font-bold text-gray-500 transition-all hover:scale-105 hover:bg-teal-500 hover:text-white"
        onClick={addNewChat}
      >
        Add user
      </button>
    </div>
  )
}

export default NewChatModal
