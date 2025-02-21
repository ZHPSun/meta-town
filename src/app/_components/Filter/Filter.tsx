import Input from '@/components/Input'
import { FC } from 'react'
import CreatedSpaces from './_components/CreatedSpaces'
import LastVisited from './_components/LastVisited'

const Filter: FC = () => (
  <div className="flex justify-end gap-4 px-6 py-6">
    <LastVisited />
    <CreatedSpaces />
    <Input prefix={{ name: 'search', label: 'Search' }} />
  </div>
)

export default Filter
