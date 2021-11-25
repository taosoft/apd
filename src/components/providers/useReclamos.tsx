import { Alert } from 'react-native'

import {
  cloudinaryUpload,
  UploadImageResponse,
} from '../../services/image.service'
import CreateReclamo, {
  GetReclamo,
  GetReclamoDetalle,
  GetReclamos,
  ReclamoDetalleModel,
  ReclamoModel,
} from '../../services/reclamo.service'
import useAuth from './useAuth'
import { GenerateType, useCache } from './useCache'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useReclamos() {
  const { cache, changeCache } = useCache()
  const { token } = useAuth()

  async function submitReclamo(): Promise<boolean> {
    const uploadImagesResponses = await uploadImages()
    try {
      await CreateReclamo(
        {
          ...cache.generarReclamo,
          archivosURL: uploadImagesResponses
            .map((imagen) => imagen.response?.secure_url ?? '')
            .join(';'),
        },
        token,
      )
      clearReclamo()
      return true
    } catch (e) {
      Alert.alert(e)
      return false
    }
  }

  async function uploadImages(): Promise<UploadImageResponse[]> {
    return await Promise.all<UploadImageResponse>(
      cache.generarReclamo.images.map(async (image) => {
        return await cloudinaryUpload(image, GenerateType.RECLAMO)
      }),
    )
  }

  async function getReclamos(): Promise<ReclamoDetalleModel[]> {
    return await GetReclamos(token)
  }

  async function getReclamo(idReclamo: number): Promise<ReclamoModel> {
    return await GetReclamo(idReclamo, token)
  }

  async function getReclamoDetalle(
    idReclamo: number,
  ): Promise<ReclamoDetalleModel> {
    return await GetReclamoDetalle(idReclamo, token)
  }

  function clearReclamo(): void {
    changeCache({
      addedPhoto: undefined,
      generarReclamo: {
        descripcion: '',
        idDesperfecto: 0,
        idRubro: 0,
        idSitio: 0,
        images: [],
      },
    })
  }

  function setDesperfecto(desperfecto: string): void {
    changeCache({
      generarReclamo: {
        ...cache.generarReclamo,
        idDesperfecto: +desperfecto,
      },
    })
  }
  function setLugar(lugar: string): void {
    changeCache({
      generarReclamo: {
        ...cache.generarReclamo,
        idSitio: +lugar,
      },
    })
  }
  function setReason(reason: string): void {
    changeCache({
      generarReclamo: {
        ...cache.generarReclamo,
        descripcion: reason,
      },
    })
  }
  function setRubro(rubro: string): void {
    changeCache({
      generarReclamo: {
        ...cache.generarReclamo,
        idRubro: +rubro,
      },
    })
  }

  function addCachedImage(): void {
    if (cache.addedPhoto) {
      const image = cache.addedPhoto
      changeCache({
        addedPhoto: undefined,
        generarReclamo: {
          ...cache.generarReclamo,
          images: [...cache.generarReclamo.images, image],
        },
      })
    }
  }

  function addImage(uri: string): void {
    changeCache({
      generarReclamo: {
        ...cache.generarReclamo,
        images: [...cache.generarReclamo.images, uri],
      },
    })
  }

  function removeImage(index: number): void {
    changeCache({
      generarReclamo: {
        ...cache.generarReclamo,
        images: [
          ...cache.generarReclamo.images.slice(0, index),
          ...cache.generarReclamo.images.slice(index + 1),
        ],
      },
    })
  }

  return {
    addCachedImage,
    addImage,
    cachedImage: cache.addedPhoto,
    getReclamo,
    getReclamoDetalle,
    getReclamos,
    reclamo: cache.generarReclamo,
    removeImage,
    setDesperfecto,
    setLugar,
    setReason,
    setRubro,
    submitReclamo,
  }
}
