import React, { FC } from 'react'
import Actions from './_components/Actions'
import Navigation from './_components/Navigation'

const Header: FC = () => (
  <header className="flex justify-between border-b border-neutral-200 px-6 py-4">
    <Navigation />
    <Actions />
  </header>
)

export default Header
