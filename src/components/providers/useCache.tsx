import { isNil } from 'lodash'
import React, { createContext, useContext, useState } from 'react'

export interface Cache {
  addedPhoto?: string
  generarDenuncia: GenerarDenuncia
  generarReclamo: GenerarReclamo
  generarComercio: GenerarComercio
  generarServicio: GenerarServicio
  token?: string
  documento?: string
  isInspector: boolean
}

export interface GenerarDenuncia {
  date: string
  name: string
  idSitio: number
  address: string
  descripcion: string
  images: string[]
  isTermsAndConditions: boolean
}

export interface GenerarReclamo {
  idSitio: number
  idDesperfecto: number
  descripcion: string
  idRubro: number
  images: string[]
}
export interface GenerarComercio {
  nombre: string
  horario: string
  direccion: string
  descripcion: string
  images: string[]
}
export interface GenerarServicio {
  idRubro: number
  nombreServicio: string
  nombrePersona: string
  direccion: string
  telefono: string
  email: string
  horario: string
  descripcion: string
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
  generarComercio?: GenerarComercio
  generarServicio?: GenerarServicio
  token?: string
  documento?: string
  isInspector?: boolean
}

export const defaultCache: Cache = {
  addedPhoto: undefined,
  documento: undefined,
  generarComercio: {
    descripcion: '',
    direccion: '',
    horario: '',
    images: [],
    nombre: '',
  },
  generarDenuncia: {
    address: '',
    date: '',
    descripcion: '',
    idSitio: 0,
    images: [],
    isTermsAndConditions: false,
    name: '',
  },
  generarReclamo: {
    descripcion: '',
    idDesperfecto: 0,
    idRubro: 0,
    idSitio: 0,
    images: [],
  },
  generarServicio: {
    descripcion: '',
    direccion: '',
    email: '',
    horario: '',
    idRubro: 0,
    images: [],
    nombrePersona: '',
    nombreServicio: '',
    telefono: '',
  },
  isInspector: false,
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
      addedPhoto: config.addedPhoto,
      ...(config.token && {
        token: config.token,
      }),
      ...(config.documento && {
        documento: config.documento,
      }),
      ...(!isNil(config.isInspector) && {
        isInspector: config.isInspector,
      }),
      ...(config.generarDenuncia && {
        generarDenuncia: {
          address: config.generarDenuncia.address,
          date: config.generarDenuncia.date,
          descripcion: config.generarDenuncia.descripcion,
          idSitio: config.generarDenuncia.idSitio,
          images: config.generarDenuncia.images,
          isTermsAndConditions: config.generarDenuncia.isTermsAndConditions,
          name: config.generarDenuncia.name,
        },
      }),
      ...(config.generarReclamo && {
        generarReclamo: {
          descripcion: config.generarReclamo.descripcion,
          idDesperfecto: config.generarReclamo.idDesperfecto,
          idRubro: config.generarReclamo.idRubro,
          idSitio: config.generarReclamo.idSitio,
          images: config.generarReclamo.images,
        },
      }),
      ...(config.generarComercio && {
        generarComercio: {
          descripcion: config.generarComercio.descripcion,
          direccion: config.generarComercio.direccion,
          horario: config.generarComercio.horario,
          images: config.generarComercio.images,
          nombre: config.generarComercio.nombre,
        },
      }),
      ...(config.generarServicio && {
        generarServicio: {
          descripcion: config.generarServicio.descripcion,
          direccion: config.generarServicio.direccion,
          email: config.generarServicio.email,
          horario: config.generarServicio.horario,
          idRubro: config.generarServicio?.idRubro,
          images: config.generarServicio.images,
          nombrePersona: config.generarServicio.nombrePersona,
          nombreServicio: config.generarServicio.nombreServicio,
          telefono: config.generarServicio.telefono,
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
