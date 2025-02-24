import { FC } from 'react'
import Link from 'next/link'

const Logo: FC = () => (
  <Link className="group text-2xl" href="/">
    <span className="inline-block rounded-lg bg-neutral-900 px-4 py-2 text-white group-hover:bg-neutral-700">
      Meta
    </span>
    &nbsp;
    <span className="color-neutral-900 font-medium group-hover:underline group-hover:underline-offset-8">
      Town
    </span>
  </Link>
)

export default Logo
