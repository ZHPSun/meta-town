import React, { FC } from 'react'
import Actions from './_components/Actions'
import Navigation from './_components/Navigation'

const Header: FC = () => (
  <header className="flex justify-between bg-gray-700">
    <Navigation />
    <Actions />
  </header>
)

export default Header
