import { FC } from 'react'
import UserInfo from './_components/UserInfo'

const Video: FC = () => (
  <div className="relative mx-auto flex aspect-[16/9] w-full min-w-[300px] items-center justify-center rounded-2xl border-4 bg-gray-200">
    <UserInfo />
    <p>Placeholder</p>
  </div>
)

export default Video
