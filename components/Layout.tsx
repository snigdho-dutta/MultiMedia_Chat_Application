import React from 'react'
import Sidebar from './Sidebar/Sidebar'

const Layout: React.FC = ({ children }) => {
  return (
    <div className="relative flex w-screen flex-row">
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}

export default Layout
