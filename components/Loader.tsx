import Head from 'next/head'
import React from 'react'

const Loader = () => {
  return (
    <div className="flex-col-center h-screen w-screen">
      <Head>
        <title>Login</title>
      </Head>
      <div className="h-20 w-20 animate-spin rounded-full border-t-2 border-b-2 border-teal-600 transition"></div>
      <h1 className="text-xl font-semibold text-gray-500">Loading...</h1>
    </div>
  )
}

export default Loader
