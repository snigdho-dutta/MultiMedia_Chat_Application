import { ChatAlt2Icon } from '@heroicons/react/outline'
import { onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { chatState, siderbarState } from '../../atoms'
import ChatList from '../Chat/ChatList'
import Header from './Header'

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useRecoilState(siderbarState)
  return (
    <nav
      className={`absolute z-10 flex h-screen min-w-[280px] flex-col bg-gray-100 sm:translate-x-0 transition-all duration-200 sm:static sm:w-4/12
    ${showSidebar ? 'translate-x-0' : '-translate-x-[100%]'}
    `}
    >
      <Header />
      <div className="flex-row-around border-b-2 border-gray-300 bg-gradient-to-tr from-orange-300 font-semibold italic text-gray-600">
        <h1>My Chats</h1>
        <ChatAlt2Icon className="icon text-teal-600" />
      </div>
      <ChatList />
    </nav>
  )
}

export default Sidebar
