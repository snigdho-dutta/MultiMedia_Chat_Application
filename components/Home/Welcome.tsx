import { ChatAlt2Icon } from '@heroicons/react/outline'
import { ArrowSmLeftIcon } from '@heroicons/react/solid'
import React from 'react'

const Welcome = () => {
  return (
    <div className="flex-col-center box-shadow h-2/6 w-[80%] max-w-md rounded-xl bg-gradient-to-tr from-red-500/70 to-yellow-500/70 py-4 px-2 text-xl font-bold text-indigo-500 sm:text-2xl md:text-3xl xl:text-4xl">
      <h1>Welcome to the app!</h1>
      <ChatAlt2Icon className="text-emerald-500" />
      <div className="flex-row-between group w-full cursor-pointer space-x-4">
        <ArrowSmLeftIcon className="icon hover:box-shadow w-[25%] animate-pulse bg-white transition-all group-hover:scale-105 group-hover:animate-none" />
        <h1 className="animate-pulse text-base italic text-gray-600 group-hover:animate-none group-hover:text-gray-700">
          Select a chat to start conversation
        </h1>
      </div>
    </div>
  )
}

export default Welcome
