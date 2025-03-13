import { FC } from 'react' //-
import IconButton from '@/components/IconButton'
import navigate from '@/utils/navigate'

const SignOut: FC = () => (
  <IconButton
    icon="log-out"
    label="Sign Out"
    variant="danger"
    onClick={() => navigate('/authentication/sign-out')}
  />
)

export default SignOut
