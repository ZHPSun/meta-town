'use client'

import { FC, useState } from 'react'
import Footer from './_components/Footer'
import ChatSideWindow from './_components/ChatSideWindow'
import ParticipantsSideWindow from './_components/ParticipantsSideWindow'
import Header from './_components/Header'
import Meeting from './_components/Meeting'
import Stage from './_components/Stage'

const Space: FC = () => {
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false)

  const [isParticipantsWindowOpen, setIsParticipantsWindowOpen] =
    useState(false)

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <Meeting />

      <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-neutral-400">
        <Stage />
        {isChatWindowOpen && (
          <ChatSideWindow onClose={() => setIsChatWindowOpen(false)} />
        )}
        {isParticipantsWindowOpen && (
          <ParticipantsSideWindow
            onClose={() => setIsParticipantsWindowOpen(false)}
          />
        )}
      </main>
      <div>
        <Footer
          isChatActive={isChatWindowOpen}
          isParticipantsActive={isParticipantsWindowOpen}
          onChatClick={() =>
            setIsChatWindowOpen(
              (previousIsChatWindowOpen) => !previousIsChatWindowOpen
            )
          }
          onParticipantsClick={() =>
            setIsParticipantsWindowOpen(
              (previousIsParticipantsWindowOpen) =>
                !previousIsParticipantsWindowOpen
            )
          }
        />
      </div>
    </div>
  )
}

export default Space
