import { FC } from 'react'
import UserInfo from './_components/UserInfo'

const Video: FC = () => (
  <div className="relative mx-auto flex h-40 w-60 items-center justify-center rounded-2xl border-4 bg-gray-200">
    <UserInfo />
    <p>Placeholder</p>
  </div>
)

export default Video
