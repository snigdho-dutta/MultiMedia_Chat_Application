import React from 'react'
import { ChatIcon, GlobeIcon } from '@heroicons/react/solid'
import { GlobeAltIcon } from '@heroicons/react/outline'
import { googleSignIn } from '../../utils/googleAuthHandler'
import Head from 'next/head'

const Login = () => {
  return (
    <div className="flex-col-around h-screen">
        <Head>
            <title>Login</title>
        </Head>
      <div className="box-shadow flex-col-around h-3/6 w-6/12 max-w-sm rounded bg-gray-200 py-4 px-2 pb-6">
        <h1 className="text-2xl font-bold text-gray-600">Welome on Board</h1>
        <ChatIcon className="h-5/6 w-10/12 text-emerald-500" />
        <button
          className="hover:box-shadow group flex items-center rounded-lg bg-gradient-to-b from-amber-400 to-yellow-400 px-2 py-1 text-lg font-semibold text-gray-500 transition-all hover:-translate-y-1 hover:scale-105 hover:bg-gradient-to-t hover:text-gray-700"
          onClick={googleSignIn}
        >
          <GlobeIcon className="h-10 w-10 text-emerald-300 transition group-hover:text-emerald-500" />
          <p className="whitespace">Sign-up with Google</p>
        </button>
      </div>
    </div>
  )
}

export default Login
