import React from 'react'
import MessageContainer from './MessageContainer'
import MessageInput from './MessageInput'

const ChatContainer = () => {
  return (
    <div className="flex-col-center relative max-h-full w-full flex-1">
      <MessageContainer />
      <MessageInput />
    </div>
  )
}

export default ChatContainer
