import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const VerticalList: FC<Props> = ({ children }) => (
  <ul className="space-y-4">{children}</ul>
)

export default VerticalList
