import React, { createContext, useContext, useState } from 'react'

export interface Cache {
  addedPhoto?: string
  generarDenuncia: GenerarDenuncia
  generarReclamo: GenerarReclamo
  token?: string
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
  lugar: string
  rubro: string
  desperfecto: string
  reason: string
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
}

export const defaultCache: Cache = {
  addedPhoto: undefined,
  generarDenuncia: {
    address: '',
    date: '',
    images: [
      'https://res.cloudinary.com/apd-2021-uade/image/upload/v1630022899/APD/reportes/t462hslh7drwgnrzlraw.jpg',
    ],
    isTermsAndConditions: false,
    name: '',
    reason: '',
  },
  generarReclamo: {
    desperfecto: '',
    images: [
      'https://res.cloudinary.com/apd-2021-uade/image/upload/v1630022899/APD/reportes/t462hslh7drwgnrzlraw.jpg',
    ],
    lugar: '',
    reason: '',
    rubro: '',
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
          desperfecto: config.generarReclamo.desperfecto,
          images: config.generarReclamo.images,
          lugar: config.generarReclamo.lugar,
          reason: config.generarReclamo.reason,
          rubro: config.generarReclamo.rubro,
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
