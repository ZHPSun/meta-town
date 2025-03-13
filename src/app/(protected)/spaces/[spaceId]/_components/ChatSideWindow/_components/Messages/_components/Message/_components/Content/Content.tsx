import { FC } from 'react'

interface Props {
  children: string
}

const Content: FC<Props> = ({ children }) => (
  <p className="rounded-xl border border-black text-base">{children}</p>
)

export default Content
