import { FC, ReactNode } from 'react'
import MuteIndicator from './_components/MuteIndicator'

interface Props {
  children?: ReactNode
}

const UserInfo: FC<Props> = () => (
  <div className="absolute left-[10%] top-[10%] flex h-10 items-center rounded-2xl bg-neutral-300">
    <MuteIndicator isMuted />
    <span className="px-2">Jack</span>
  </div>
)

export default UserInfo
