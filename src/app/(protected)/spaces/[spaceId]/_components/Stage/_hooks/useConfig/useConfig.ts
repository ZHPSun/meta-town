import { useEffect, useState } from 'react'
import { Config } from '../../_components/Configuration'
import { type Coordinates } from '../../_components/Placement'

type Data = Record<Config, Coordinates[]>

const useConfig = ({
  walls,
}: Data): {
  config: Config | null
  data: Data
  coordinatesConfig: (Coordinates & { config: Config }) | null
  handleCoordinates: (x: number, y: number) => void
  handleEdit: (x: number, y: number) => void
  handleConfig: (config: Config | null) => void
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

  const handleConfig = (value: Config | null): void =>
    setConfig((previousConfig) => (previousConfig === value ? null : value))

  const [coordinatesConfig, setCoordinatesConfig] = useState<
    (Coordinates & { config: Config }) | null
  >(null)

  useEffect(() => {
    if (config) {
      return
    }

    setCoordinatesConfig(null)
  }, [config])

  const handleCoordinates = (x: number, y: number): void => {
    if (!config) {
      return
    }

    setCoordinatesConfig({ x, y, direction: 'N', config })
  }

  return {
    config,
    data: configData,
    coordinatesConfig,
    handleCoordinates,
    handleEdit,
    handleConfig,
  }
}

export default useConfig
