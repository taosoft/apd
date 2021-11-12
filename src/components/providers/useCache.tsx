import React, { createContext, useContext, useState } from 'react'

export interface Cache {
  addedPhoto?: string
  generarDenuncia: GenerarDenuncia
  generarReclamo: GenerarReclamo
  token?: string
  documento?: string
}

export interface GenerarDenuncia {
  date: string
  name: string
  address: string
  reason: string
  images: string[]
  isTermsAndConditions: boolean
}

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

export interface UpdateCache {
  addedPhoto?: string
  generarDenuncia?: GenerarDenuncia
  generarReclamo?: GenerarReclamo
  token?: string
  documento?: string
}

export const defaultCache: Cache = {
  addedPhoto: undefined,
  documento: undefined,
  generarDenuncia: {
    address: '',
    date: '',
    images: [],
    isTermsAndConditions: false,
    name: '',
    reason: '',
  },
  generarReclamo: {
    idDesperfecto: 0,
    idRubro: 0,
    idSitio: 0,
    images: [],
    reason: '',
  },
  token: undefined,
}

export const CacheContext = createContext({
  cache: defaultCache,
  changeCache: () => null,
} as CacheContextValue)

interface CacheProviderProps {
  children: React.ReactNode
}

type CacheConfig = (cache: UpdateCache) => void

interface CacheContextValue {
  cache: Cache
  changeCache: CacheConfig
}

export function CacheProvider(props: CacheProviderProps): JSX.Element {
  const { children } = props

  const [cache, setCache] = useState<Cache>(defaultCache)

  function changeCache(config: UpdateCache): void {
    const nextCache = {
      ...cache,
      ...(config.addedPhoto && {
        addedPhoto: config.addedPhoto,
      }),
      ...(config.token && {
        token: config.token,
      }),
      ...(config.documento && {
        documento: config.documento,
      }),
      ...(config.generarDenuncia && {
        generarDenuncia: {
          address: config.generarDenuncia.address,
          date: config.generarDenuncia.date,
          images: config.generarDenuncia.images,
          isTermsAndConditions: config.generarDenuncia.isTermsAndConditions,
          name: config.generarDenuncia.name,
          reason: config.generarDenuncia.reason,
        },
      }),
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

    setCache(nextCache)
  }

  return (
    <CacheContext.Provider value={{ cache, changeCache }}>
      {children}
    </CacheContext.Provider>
  )
}

export function useCache(): CacheContextValue {
  const { cache, changeCache } = useContext(CacheContext)

  return {
    cache,
    changeCache,
  }
}
