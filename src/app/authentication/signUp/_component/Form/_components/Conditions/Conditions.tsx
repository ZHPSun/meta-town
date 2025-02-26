import { FC } from 'react'
import Link from 'next/link'

const Conditions: FC = () => (
  <div className="mb-6">
    <p>By signing up, you agree to our</p>
    <ul className="flex flex-col">
      <li>
        <Link href="/">Terms & Conditions</Link>
      </li>
      <li>
        <Link href="/">Privacy Policy</Link>
      </li>
    </ul>
  </div>
)

export default Conditions
