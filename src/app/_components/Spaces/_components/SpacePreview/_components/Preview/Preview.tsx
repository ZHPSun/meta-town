import { FC } from 'react'
import LinkToSpace from './_components/LinkToSpace'

const spaceID = '12345'

const Preview: FC = () => (
  <LinkToSpace spaceID={spaceID}>
    <div className="flex h-40 items-center justify-center">Placeholder</div>
  </LinkToSpace>
)

export default Preview
