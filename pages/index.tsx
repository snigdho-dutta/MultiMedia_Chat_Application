import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentChatState, modalState, siderbarState } from '../atoms'
import ChatContainer from '../components/Chat/ChatContainer'
import NewChatModal from '../components/Chat/NewChatModal'
import SidebarToggleButon from '../components/Home/SidebarToggleButon'
import Welcome from '../components/Home/Welcome'

const Home: NextPage = () => {
  const showModal = useRecoilValue(modalState)
  const currentChat = useRecoilValue(currentChatState)

  return (
    <>
      <Head>
        <title>Watsapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SidebarToggleButon />
      {showModal && <NewChatModal />}
      {!currentChat && !showModal && <Welcome />}
      {currentChat && <ChatContainer />}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  }
}

export default Home
