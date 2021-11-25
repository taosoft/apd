import * as Network from 'expo-network'
import React, { createContext, useContext, useEffect, useState } from 'react'

export interface Cron {
  generarReclamo?: GenerarReclamo
}

// TODO: Sólo envío de reclamos

export interface GenerarReclamo {
  idSitio: number
  idDesperfecto: number
  reason: string
  idRubro: number
  images: string[]
}

export enum GenerateType {
  DENUNCIA = 'Denuncia',
  RECLAMO = 'Reclamo',
  SERVICIO = 'Servicio',
  COMERCIO = 'Comercio',
}

export interface UpdateCron {
  generarReclamo?: GenerarReclamo
}

export const defaultCron: Cron = {
  generarReclamo: {
    idDesperfecto: 0,
    idRubro: 0,
    idSitio: 0,
    images: [],
    reason: '',
  },
}

export const CronContext = createContext({
  changeCron: () => null,
  cron: defaultCron,
} as CronContextValue)

interface CronProviderProps {
  children: React.ReactNode
}

type CronConfig = (cron: UpdateCron) => void

interface CronContextValue {
  cron: Cron
  changeCron: CronConfig
}

export function CronProvider(props: CronProviderProps): JSX.Element {
  const { children } = props

  const [cron, setCron] = useState<Cron>(defaultCron)
  const [networkState, setNetworkState] = useState<
    Network.NetworkState | undefined
  >(undefined)

  useEffect(() => {
    const timer = setInterval(async () => {
      const networkStateResponse = await Network.getNetworkStateAsync()
      setNetworkState(networkStateResponse)
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (
      networkState?.isConnected &&
      networkState.type === Network.NetworkStateType.WIFI
    ) {
      runCron()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkState])

  function runCron(): void {
    runReclamosCron()
  }

  function runReclamosCron() {
    // throw new Error('Function not implemented.')
  }

  function changeCron(config: UpdateCron): void {
    const nextCron = {
      ...cron,
      ...(config.generarReclamo && {
        generarReclamo: {
          idDesperfecto: config.generarReclamo.idDesperfecto,
          idRubro: config.generarReclamo.idRubro,
          idSitio: config.generarReclamo.idSitio,
          images: config.generarReclamo.images,
          reason: config.generarReclamo.reason,
        },
      }),
    }

    setCron(nextCron)
  }

  return (
    <CronContext.Provider value={{ changeCron, cron }}>
      {children}
    </CronContext.Provider>
  )
}

export function useCron(): CronContextValue {
  const { cron, changeCron } = useContext(CronContext)

  return {
    changeCron,
    cron,
  }
}
