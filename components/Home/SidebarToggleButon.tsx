import { MenuIcon, XIcon } from '@heroicons/react/outline'
import React from 'react'
import { useRecoilState } from 'recoil'
import { siderbarState } from '../../atoms'

const SidebarToggleButon = () => {
  const [showSidebar, setShowSidebar] = useRecoilState(siderbarState)
  return (
    <div className="fixed top-0 z-10 right-0 p-2 sm:hidden">
      <button onClick={() => setShowSidebar((p) => !p)}>
        {showSidebar ? (
          <XIcon className="icon hover:box-shadow bg-yellow-400 text-purple-500" />
        ) : (
          <MenuIcon className="icon hover:box-shadow bg-yellow-400 text-purple-500" />
        )}
      </button>
    </div>
  )
}

export default SidebarToggleButon
