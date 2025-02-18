import { ChevronUp, Webcam } from 'lucide-react'
import { FC } from 'react'

const Configurable: FC = () => (
  <table className="border-separate border-spacing-4 text-center">
    <thead>
      <tr>
        <th></th>
        <th>Primary</th>
        <th>Secondary</th>
        <th>Success</th>
        <th>Warning</th>
        <th>Danger</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Default</td>
        <td>
          <div className="relative flex h-12 w-20 text-white">
            <button className="relative z-10 w-12 rounded-2xl bg-neutral-900 outline-offset-4 hover:bg-neutral-700">
              <Webcam className="mx-auto" />
            </button>
            <div className="absolute bottom-0 right-0 top-0 w-16 rounded-2xl bg-neutral-500 text-right hover:bg-neutral-700">
              <button className="h-full px-2 outline-offset-4">
                <ChevronUp size={20} />
              </button>
            </div>
          </div>
        </td>
        <td>
          <div className="relative flex h-12 w-20">
            <button className="relative z-10 w-12 rounded-2xl border border-neutral-900 bg-white outline-offset-4 hover:bg-neutral-200">
              <Webcam className="mx-auto" />
            </button>
            <div className="absolute bottom-0 right-0 top-0 w-16 rounded-2xl bg-neutral-300 text-right hover:bg-neutral-400">
              <button className="h-full px-2 outline-offset-4">
                <ChevronUp size={20} />
              </button>
            </div>
          </div>
        </td>
        <td>
          <div className="relative flex h-12 w-20 text-white">
            <button className="relative z-10 w-12 rounded-2xl bg-emerald-500 outline-offset-4 hover:bg-emerald-700">
              <Webcam className="mx-auto" />
            </button>
            <div className="absolute bottom-0 right-0 top-0 w-16 rounded-2xl bg-emerald-800 text-right hover:bg-emerald-600">
              <button className="h-full px-2 outline-offset-4">
                <ChevronUp size={20} />
              </button>
            </div>
          </div>
        </td>
        <td>
          <div className="relative flex h-12 w-20 text-white">
            <button className="relative z-10 w-12 rounded-2xl bg-amber-500 outline-offset-4 hover:bg-amber-700">
              <Webcam className="mx-auto" />
            </button>
            <div className="absolute bottom-0 right-0 top-0 w-16 rounded-2xl bg-amber-800 text-right hover:bg-amber-600">
              <button className="h-full px-2 outline-offset-4">
                <ChevronUp size={20} />
              </button>
            </div>
          </div>
        </td>
        <td>
          <div className="relative flex h-12 w-20 text-white">
            <button className="relative z-10 w-12 rounded-2xl bg-rose-500 outline-offset-4 hover:bg-rose-700">
              <Webcam className="mx-auto" />
            </button>
            <div className="absolute bottom-0 right-0 top-0 w-16 rounded-2xl bg-rose-800 text-right hover:bg-rose-600">
              <button className="h-full px-2 outline-offset-4">
                <ChevronUp size={20} />
              </button>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td>Hover</td>
        <td colSpan={5}>
          <p className="flex h-12 items-center justify-center">
            Please use the Mouse to hover onto the button to check the hover
            style.
          </p>
        </td>
      </tr>
      <tr>
        <td>Active / Focus</td>
        <td colSpan={5}>
          <p className="flex h-12 items-center justify-center">
            Please use the Tab key to move the cursor onto the button to check
            the active style.
          </p>
        </td>
      </tr>
      <tr>
        <td>Large</td>
        <td>
          <div className="relative flex h-14 w-24 text-white">
            <button className="relative z-10 w-14 rounded-2xl bg-neutral-900 outline-offset-4 hover:bg-neutral-700">
              <Webcam size={28} className="mx-auto" />
            </button>
            <div className="absolute bottom-0 right-0 top-0 w-16 rounded-2xl bg-neutral-500 text-right hover:bg-neutral-700">
              <button className="h-full px-3 outline-offset-4">
                <ChevronUp size={22} />
              </button>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
)

export default Configurable
