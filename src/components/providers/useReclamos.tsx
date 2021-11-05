import { Alert } from 'react-native'

import {
  cloudinaryUpload,
  UploadImageResponse,
} from '../../services/image.service'
import CreateReclamo, {
  GetReclamo,
  GetReclamos,
  ReclamoModel,
} from '../../services/reclamo.service'
import { GenerateType, useCache } from './useCache'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useReclamos() {
  const { cache, changeCache } = useCache()

  async function submitReclamo(): Promise<boolean> {
    const uploadImagesResponses = await uploadImages()
    try {
      await CreateReclamo({
        ...cache.generarReclamo,
        archivosURL: uploadImagesResponses
          .map((imagen) => imagen.response?.secure_url ?? '')
          .join(';'),
        documento: '12345678',
      })
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

  async function getReclamos(): Promise<ReclamoModel[]> {
    return await GetReclamos()
  }

  async function getReclamo(idReclamo: number): Promise<ReclamoModel> {
    return await GetReclamo(idReclamo)
  }

  function clearReclamo(): void {
    changeCache({
      generarReclamo: {
        desperfecto: '',
        images: [],
        lugar: '',
        reason: '',
        rubro: '',
      },
    })
  }

  function setDesperfecto(desperfecto: string): void {
    changeCache({
      generarReclamo: {
        ...cache.generarReclamo,
        desperfecto: desperfecto,
      },
    })
  }
  function setLugar(lugar: string): void {
    changeCache({
      generarReclamo: {
        ...cache.generarReclamo,
        lugar: lugar,
      },
    })
  }
  function setReason(reason: string): void {
    changeCache({
      generarReclamo: {
        ...cache.generarReclamo,
        reason: reason,
      },
    })
  }
  function setRubro(rubro: string): void {
    changeCache({
      generarReclamo: {
        ...cache.generarReclamo,
        rubro: rubro,
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
