import { FC } from 'react'
import LinkToSpace from './_components/LinkToSpace'

interface Props {
  spaceId: string
}

const Preview: FC<Props> = ({ spaceId }) => (
  <LinkToSpace spaceID={spaceId}>
    <div className="flex h-40 items-center justify-center">Placeholder</div>
  </LinkToSpace>
)

export default Preview
