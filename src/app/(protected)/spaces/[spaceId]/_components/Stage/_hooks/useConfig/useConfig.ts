import { useState } from 'react'
import { Config } from '../../_components/Configuration'
import { type Coordinates } from '../../_components/Placement'

type Data = Record<Config, Coordinates[]>

const useConfig = ({
  walls,
}: Data): {
  config: Config | null
  data: Data
  handleEdit: (x: number, y: number) => void
  handleConfig: (config: Config) => void
} => {
  const [config, setConfig] = useState<Config | null>(null)

  const [configData, setConfigData] = useState<Record<Config, Coordinates[]>>({
    walls,
  })

  const handleEdit = (x: number, y: number): void => {
    if (!config) {
      return
    }

    setConfigData((previousConfigData) => ({
      ...previousConfigData,
      [config]: [...previousConfigData[config], { x, y, direction: 'N' }],
    }))
  }

  const handleConfig = (value: Config): void =>
    setConfig((previousConfig) => (previousConfig === value ? null : value))

  return {
    config,
    data: configData,
    handleEdit,
    handleConfig,
  }
}

export default useConfig
