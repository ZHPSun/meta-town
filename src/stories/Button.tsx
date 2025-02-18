import { Beer, Ham, Nut } from 'lucide-react'
import { FC } from 'react'

const Button: FC = () => (
  <table className="border-separate border-spacing-4 text-center">
    <thead>
      <tr>
        <th />
        <th>Primary</th>
        <th>Secondary</th>
        <th>Naked</th>
        <th>Success</th>
        <th>Warning</th>
        <th>Danger</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Default</td>
        <td>
          <button className="h-12 rounded-lg border border-neutral-900 bg-neutral-900 px-4 text-white outline-offset-4">
            Button
          </button>
        </td>
        <td>
          <button className="h-12 rounded-lg border border-neutral-900 bg-white px-4 text-neutral-900 outline-offset-4">
            Button
          </button>
        </td>
        <td>
          <button className="h-12 rounded-lg border border-transparent px-4 text-neutral-900 outline-offset-4">
            Button
          </button>
        </td>
        <td>
          <button className="h-12 rounded-lg border border-emerald-500 bg-emerald-500 px-4 text-white outline-offset-4">
            Button
          </button>
        </td>
        <td>
          <button className="h-12 rounded-lg border border-amber-500 bg-amber-500 px-4 text-white outline-offset-4">
            Button
          </button>
        </td>
        <td>
          <button className="h-12 rounded-lg border border-rose-500 bg-rose-500 px-4 text-white outline-offset-4">
            Button
          </button>
        </td>
      </tr>
      <tr>
        <td>Hover</td>
        <td>
          <button className="h-12 rounded-lg border border-neutral-900 bg-neutral-900 bg-opacity-80 px-4 text-white outline-offset-4">
            Button
          </button>
        </td>
        <td>
          <button className="h-12 rounded-lg border border-neutral-900 bg-neutral-200 px-4 text-neutral-900 outline-offset-4">
            Button
          </button>
        </td>
        <td>
          <button className="h-12 rounded-lg border border-transparent bg-neutral-200 px-4 text-neutral-900 outline-offset-4">
            Button
          </button>
        </td>
        <td>
          <button className="h-12 rounded-lg border border-emerald-500 bg-emerald-500 bg-opacity-80 px-4 text-white outline-offset-4">
            Button
          </button>
        </td>
        <td>
          <button className="h-12 rounded-lg border border-amber-500 bg-amber-500 bg-opacity-80 px-4 text-white outline-offset-4">
            Button
          </button>
        </td>
        <td>
          <button className="h-12 rounded-lg border border-rose-500 bg-rose-500 bg-opacity-80 px-4 text-white outline-offset-4">
            Button
          </button>
        </td>
      </tr>
      <tr>
        <td>Active / Focus</td>
        <td colSpan={6}>
          Please use the Tab key to move the cursor onto the button to check the
          active style.
        </td>
      </tr>
      <tr>
        <td>With prefix Icon</td>
        <td>
          <button className="flex h-12 items-center gap-2 rounded-lg border border-neutral-900 bg-neutral-900 px-4 text-white outline-offset-4">
            <Nut />
            Button
          </button>
        </td>
      </tr>
      <tr>
        <td>With suffix Icon</td>
        <td>
          <button className="flex h-12 items-center gap-2 rounded-lg border border-neutral-900 bg-neutral-900 px-4 text-white outline-offset-4">
            Button
            <Ham />
          </button>
        </td>
      </tr>
      <tr>
        <td>Icon</td>
        <td>
          <button className="h-12 rounded-2xl border border-neutral-900 bg-neutral-900 px-4 text-white outline-offset-4">
            <Beer />
          </button>
        </td>
      </tr>
      <tr>
        <td>Large</td>
        <td>
          <button className="h-14 rounded-lg border border-neutral-900 bg-neutral-900 px-8 text-lg text-white outline-offset-4">
            Button
          </button>
        </td>
        <td>
          <button className="h-14 rounded-lg border border-neutral-900 bg-white px-8 text-lg text-neutral-900 outline-offset-4">
            Button
          </button>
        </td>
        <td>
          <button className="h-14 border border-transparent px-8 text-lg text-neutral-900 outline-offset-4">
            Button
          </button>
        </td>
        <td>
          <button className="h-14 rounded-lg border border-emerald-500 bg-emerald-500 px-8 text-lg text-white outline-offset-4">
            Button
          </button>
        </td>
        <td>
          <button className="h-14 rounded-lg border border-amber-500 bg-amber-500 px-8 text-lg text-white outline-offset-4">
            Button
          </button>
        </td>
        <td>
          <button className="h-14 rounded-lg border border-rose-500 bg-rose-500 px-8 text-lg text-white outline-offset-4">
            Button
          </button>
        </td>
      </tr>
    </tbody>
  </table>
)

export default Button
