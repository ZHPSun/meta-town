'use client'

import { FC, useState } from 'react'
import ChatSideWindow from './_components/ChatSideWindow'
import Footer from './_components/Footer'
import Header from './_components/Header'
import Meeting from './_components/Meeting'
import ParticipantsSideWindow from './_components/ParticipantsSideWindow'
import Stage from './_components/Stage'

const Space: FC = () => {
  const [sideWindow, setSideWindow] = useState<'chat' | 'participants' | null>(
    null
  )

  const [isStageConfigurationOpen, setIsStageConfigurationOpen] =
    useState(false)

  return (
    <div>
      <div className="flex h-screen flex-col">
        <Header onEditSpace={() => setIsStageConfigurationOpen(true)} />

        <main className="relative flex-1 overflow-hidden">
          <Stage
            onConfigurationClose={() => setIsStageConfigurationOpen(false)}
            isConfigurationOpen={isStageConfigurationOpen}
          />
          <Meeting />
          {sideWindow === 'chat' && (
            <ChatSideWindow onClose={() => setSideWindow(null)} />
          )}
          {sideWindow === 'participants' && (
            <ParticipantsSideWindow onClose={() => setSideWindow(null)} />
          )}
        </main>
        <div>
          <Footer
            isChatActive={sideWindow === 'chat'}
            isParticipantsActive={sideWindow === 'participants'}
            onChatClick={() =>
              setSideWindow((previousSetWindow) =>
                previousSetWindow === 'chat' ? null : 'chat'
              )
            }
            onParticipantsClick={() =>
              setSideWindow((previousSetWindow) =>
                previousSetWindow === 'participants' ? null : 'participants'
              )
            }
          />
        </div>
      </div>
    </div>
  )
}

export default Space
