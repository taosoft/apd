import { Alert } from 'react-native'

import {
  ComercioModel,
  CreateComercio,
  GetComercioDetalle,
  GetComercios,
} from '../../services/comercio.service'
import {
  cloudinaryUpload,
  UploadImageResponse,
} from '../../services/image.service'
import useAuth from './useAuth'
import { GenerateType, useCache } from './useCache'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useComercio() {
  const { token } = useAuth()
  const { cache, changeCache } = useCache()

  async function getComercioDetalle(
    comercioId: number,
  ): Promise<ComercioModel> {
    return await GetComercioDetalle(comercioId)
  }

  async function getComercios(): Promise<ComercioModel[]> {
    return await GetComercios()
  }

  async function createComercios(data: ComercioModel): Promise<ComercioModel> {
    return await CreateComercio(data, token)
  }

  async function submitComercio(): Promise<boolean> {
    const uploadImagesResponses = await uploadImages()
    try {
      await CreateComercio(
        {
          ...cache.generarComercio,
          archivosURL: uploadImagesResponses
            .map((imagen) => imagen.response?.secure_url ?? '')
            .join(';'),
        },
        token,
      )
      clearComercio()
      return true
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      Alert.alert(e)
      return false
    }
  }

  async function uploadImages(): Promise<UploadImageResponse[]> {
    return await Promise.all<UploadImageResponse>(
      cache.generarComercio.images.map(async (image) => {
        return await cloudinaryUpload(image, GenerateType.COMERCIO)
      }),
    )
  }

  function clearComercio(): void {
    changeCache({
      generarComercio: {
        descripcion: '',
        direccion: '',
        horario: '',
        images: [],
        nombre: '',
      },
    })
  }

  function addCachedImage(): void {
    if (cache.addedPhoto) {
      const image = cache.addedPhoto
      changeCache({
        addedPhoto: undefined,
        generarComercio: {
          ...cache.generarComercio,
          images: [...cache.generarComercio.images, image],
        },
      })
    }
  }

  function addImage(uri: string): void {
    changeCache({
      generarComercio: {
        ...cache.generarComercio,
        images: [...cache.generarComercio.images, uri],
      },
    })
  }

  function removeImage(index: number): void {
    changeCache({
      generarComercio: {
        ...cache.generarComercio,
        images: [
          ...cache.generarComercio.images.slice(0, index),
          ...cache.generarComercio.images.slice(index + 1),
        ],
      },
    })
  }

  function setNombreComercio(nombreComercio: string): void {
    changeCache({
      generarComercio: {
        ...cache.generarComercio,
        nombre: nombreComercio,
      },
    })
  }
  function setDireccion(direccion: string): void {
    changeCache({
      generarComercio: {
        ...cache.generarComercio,
        direccion: direccion,
      },
    })
  }
  function setDescripcion(descripcion: string): void {
    changeCache({
      generarComercio: {
        ...cache.generarComercio,
        descripcion: descripcion,
      },
    })
  }

  return {
    addCachedImage,
    addImage,
    cachedImage: cache.addedPhoto,
    clearComercio,
    comercio: cache.generarComercio,
    createComercios,
    getComercioDetalle,
    getComercios,
    removeImage,
    setDescripcion,
    setDireccion,
    setNombreComercio,
    submitComercio,
  }
}
