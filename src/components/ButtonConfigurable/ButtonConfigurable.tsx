import { ComponentProps, FC } from 'react'
import Button from '@/components/Button'
import IconButton from '@/components/IconButton'
import Configuration from './_components/Configuration'

export type Variant = Exclude<ComponentProps<typeof Button>['variant'], 'naked'>

interface ButtonProps
  extends Omit<ComponentProps<typeof Button>, 'prefix' | 'suffix'> {
  variant?: Variant
}

interface IconButtonProps extends ComponentProps<typeof IconButton> {
  variant?: Variant
}

type Props = ButtonProps | IconButtonProps

const isButtonProps = (props: Props): props is ButtonProps =>
  'children' in props

const isIconButtonProps = (props: Props): props is IconButtonProps =>
  'icon' in props && 'label' in props

const ButtonConfigurable: FC<Props> = ({
  size = 'default',
  variant = 'primary',
  ...props
}) => (
  <div className="relative inline-flex">
    <div className="relative z-10 mr-8">
      {isButtonProps(props) && (
        <Button
          {...props}
          size={size}
          variant={variant}
          className="!rounded-2xl"
        />
      )}
      {isIconButtonProps(props) && (
        <IconButton {...props} size={size} variant={variant} />
      )}
    </div>
    <Configuration size={size} variant={variant} />
  </div>
)

export default ButtonConfigurable
