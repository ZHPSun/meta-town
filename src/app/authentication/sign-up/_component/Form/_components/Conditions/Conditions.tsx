import { FC } from 'react'
import Link from 'next/link'

const Conditions: FC = () => (
  <div className="text-sm text-neutral-600">
    <p className="mb-2">By signing up, you agree to our:</p>
    <ul className="list-inside list-disc">
      <li>
        <Link className="underline" href="/">
          Terms & Conditions
        </Link>
      </li>
      <li>
        <Link className="underline" href="/">
          Privacy Policy
        </Link>
      </li>
    </ul>
  </div>
)

export default Conditions
