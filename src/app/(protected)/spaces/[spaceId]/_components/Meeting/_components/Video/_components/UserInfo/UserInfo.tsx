import { FC, ReactNode } from 'react'
import MuteIndicator from './_components/MuteIndicator'

interface Props {
  children?: ReactNode
}

const UserInfo: FC<Props> = () => (
  <div className="absolute left-1 top-1 flex items-center rounded-2xl bg-neutral-300 px-2 py-1">
    <MuteIndicator isMuted />
    <span className="px-2 text-sm">Jack</span>
  </div>
)

export default UserInfo
