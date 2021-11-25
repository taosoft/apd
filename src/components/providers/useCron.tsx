import * as Network from 'expo-network'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'

import {
  cloudinaryUpload,
  UploadImageResponse,
} from '../../services/image.service'
import CreateReclamo from '../../services/reclamo.service'
import useAuth from './useAuth'
import { GenerarReclamo, GenerateType } from './useCache'

export interface Cron {
  generarReclamos: GenerarReclamo[]
}
export interface UpdateCron {
  addReclamo: GenerarReclamo
}

export const defaultCron: Cron = {
  generarReclamos: [],
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

  const { token } = useAuth()

  useEffect(() => {
    const timer = setInterval(async () => {
      const networkStateResponse = await Network.getNetworkStateAsync()
      setNetworkState(networkStateResponse)
    }, 15000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (
      networkState?.isInternetReachable &&
      networkState.type === Network.NetworkStateType.WIFI
    ) {
      console.log('start cron')
      runCron()
      console.log('finish cron')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkState])

  async function runCron(): Promise<void> {
    await runReclamosCron()
  }

  async function uploadImages(
    reclamo: GenerarReclamo,
  ): Promise<UploadImageResponse[]> {
    return await Promise.all<UploadImageResponse>(
      reclamo.images.map(async (image) => {
        return await cloudinaryUpload(image, GenerateType.RECLAMO)
      }),
    )
  }

  async function submitReclamo(reclamo: GenerarReclamo): Promise<boolean> {
    const uploadImagesResponses = await uploadImages(reclamo)
    try {
      await CreateReclamo(
        {
          ...reclamo,
          archivosURL: uploadImagesResponses
            .map((imagen) => imagen.response?.secure_url ?? '')
            .join(';'),
        },
        token,
      )
      return true
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      Alert.alert(e)
      return false
    }
  }

  async function runReclamosCron() {
    console.log('generar Reclamos', cron.generarReclamos)
    const responses = await Promise.all<boolean>(
      cron.generarReclamos.map(async (reclamo) => {
        return await submitReclamo(reclamo)
      }),
    )
    setCron({ generarReclamos: [] })
    console.log('responses', responses)
  }

  function changeCron(config: UpdateCron): void {
    const nextCron = {
      ...cron,
      generarReclamos: [...cron.generarReclamos, config.addReclamo],
    }

    console.log('reclamo agregado', cron.generarReclamos)

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
