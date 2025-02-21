import Input from '@/components/Input'
import { FC } from 'react'
import CreatedSpaces from './_components/CreatedSpaces'
import LastVisited from './_components/LastVisited'

const Filter: FC = () => (
  <div className="flex justify-end gap-2 py-2 pr-2">
    <LastVisited />
    <CreatedSpaces />
    <Input prefix={{ name: 'search', label: 'Search' }} />
  </div>
)

export default Filter
