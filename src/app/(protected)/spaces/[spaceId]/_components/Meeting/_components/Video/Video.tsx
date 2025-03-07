import { FC } from 'react'
import UserInfo from './_components/UserInfo'

const Video: FC = () => (
  <div className="relative flex aspect-video w-full items-center justify-center rounded-2xl border-4 bg-gray-200">
    <UserInfo />
    <p>Placeholder</p>
  </div>
)

export default Video
