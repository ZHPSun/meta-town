import Link from 'next/link'
import React, { FC } from 'react'

const Logo: FC = () => (
  <Link className="text-2xl" href="/">
    <span className="rounded-lg bg-neutral-900 px-4 py-2 text-white">Meta</span>
    &nbsp;
    <span className="color-neutral-900 font-medium">Town</span>
  </Link>
)

export default Logo
