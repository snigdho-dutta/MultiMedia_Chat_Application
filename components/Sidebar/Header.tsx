import React from 'react'
import {
  ChatAlt2Icon,
  DotsVerticalIcon,
  LogoutIcon,
  UserAddIcon,
  UserIcon,
} from '@heroicons/react/outline'
import Icon from './Icon'
import { googleSignIn, googleSignOut } from '../../utils/googleAuthHandler'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, userState } from '../../atoms'
import Login from '../Home/Login'

const Header = () => {
  const user = useRecoilValue(userState)
  const [showModal, setShowModal] = useRecoilState(modalState)
  if (!user) return <Login />
  return (
    <header className="flex-row-around sticky top-0 left-0 h-16 bg-yellow-100 py-1">
      <Icon
        key={1}
        icon={
          user.photoURL
            ? () => (
                <img
                  src={user.photoURL || ''}
                  alt={user.name || 'profile-pic'}
                  className="hover:box-shadow h-10 w-10 rounded-full hover:scale-105"
                />
              )
            : UserIcon
        }
        text={user.name || 'Username'}
        className="bg-amber-500"
      />

      <Icon
        icon={UserAddIcon}
        text={'Chats'}
        className="bg-blue-400"
        key={2}
        onClick={() => setShowModal((p) => !p)}
      />
      <Icon
        key={3}
        icon={LogoutIcon}
        className="self-start bg-red-400 hover:bg-opacity-50"
        text="Logout"
        onClick={googleSignOut}
      />
    </header>
  )
}

export default Header
