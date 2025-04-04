'use client'

import { useParams } from 'next/navigation'
import { FC, useState } from 'react'
import GlobalLoading from '@/components/GlobalLoading'
import useSpace from '@/hooks/useSpace'
import ChatSideWindow from './_components/ChatSideWindow'
import Footer from './_components/Footer'
import Header from './_components/Header'
import Meeting from './_components/Meeting'
import ParticipantsSideWindow from './_components/ParticipantsSideWindow'
import Stage from './_components/Stage'
import useSyncSpacePresence from './_hooks/useSyncSpacePresence'

const Space: FC = () => {
  const { spaceId } = useParams<{ spaceId: string }>()

  const { data: space, isLoading } = useSpace(spaceId)

  useSyncSpacePresence()

  const [sideWindow, setSideWindow] = useState<'chat' | 'participants' | null>(
    null
  )
  const [isShowMeeting, setIsShowMeeting] = useState(false)

  const [isStageConfigurationOpen, setIsStageConfigurationOpen] =
    useState(false)

  if (isLoading) {
    return <GlobalLoading />
  }

  if (!space) {
    return <div>Space not found</div>
  }

  return (
    <div>
      <div className="flex h-screen flex-col">
        <Header
          space={space}
          onEditSpace={() => setIsStageConfigurationOpen(true)}
          onMeetingViewClick={() =>
            setIsShowMeeting((previousIsShowMeeting) => !previousIsShowMeeting)
          }
          isShowMeeting={isShowMeeting}
        />

        <main className="relative flex-1 overflow-hidden">
          <Stage
            onConfigurationClose={() => setIsStageConfigurationOpen(false)}
            isConfigurationOpen={isStageConfigurationOpen}
          />
          {isShowMeeting && <Meeting />}
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
