import { FC } from 'react'
import SideWindow from '../SideWindow'

interface Props {
  onClose: () => void
}

const ParticipantsSideWindow: FC<Props> = ({ onClose }) => (
  <div role="region" aria-label="Participants Side Window">
    <SideWindow header={<span>Users</span>} onClose={onClose}>
      Participants
    </SideWindow>
  </div>
)

export default ParticipantsSideWindow
