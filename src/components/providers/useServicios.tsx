import { Alert } from 'react-native'

import {
  cloudinaryUpload,
  UploadImageResponse,
} from '../../services/image.service'
import {
  CreateServicio,
  GetServicioDetalle,
  GetServicios,
  ServicioModel,
  ServicioModelDetalle,
} from '../../services/servicios.service'
import useAuth from './useAuth'
import { GenerateType, useCache } from './useCache'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useServicio() {
  const { token } = useAuth()
  const { cache, changeCache } = useCache()

  async function getServicioDetalle(
    comercioId: number,
  ): Promise<ServicioModelDetalle> {
    return await GetServicioDetalle(comercioId)
  }

  async function getServicios(): Promise<ServicioModel[]> {
    return await GetServicios()
  }

  async function createServicios(data: ServicioModel): Promise<ServicioModel> {
    return await CreateServicio(data, token)
  }

  async function submitServicio(): Promise<boolean> {
    const uploadImagesResponses = await uploadImages()
    try {
      CreateServicio(
        {
          ...cache.generarServicio,
          archivosURL: uploadImagesResponses
            .map((imagen) => imagen.response?.secure_url ?? '')
            .join(';'),
        },
        token,
      )
      clearServicio()
      return true
    } catch (e) {
      Alert.alert(e)
      return false
    }
  }

  async function uploadImages(): Promise<UploadImageResponse[]> {
    return await Promise.all<UploadImageResponse>(
      cache.generarServicio.images.map(async (image) => {
        return await cloudinaryUpload(image, GenerateType.COMERCIO)
      }),
    )
  }

  function clearServicio(): void {
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

  function setNombre(nombre: string): void {
    changeCache({
      generarServicio: {
        ...cache.generarServicio,
        nombrePersona: nombre,
      },
    })
  }
  function setDireccion(direccion: string): void {
    changeCache({
      generarServicio: {
        ...cache.generarServicio,
        direccion: direccion,
      },
    })
  }
  function setTelefono(telefono: string): void {
    changeCache({
      generarServicio: {
        ...cache.generarServicio,
        telefono: telefono,
      },
    })
  }
  function setEmail(email: string): void {
    changeCache({
      generarServicio: {
        ...cache.generarServicio,
        email: email,
      },
    })
  }
  function setDescripcion(descripcion: string): void {
    changeCache({
      generarServicio: {
        ...cache.generarServicio,
        descripcion: descripcion,
      },
    })
  }
  function setRubro(rubro: string): void {
    changeCache({
      generarServicio: {
        ...cache.generarServicio,
        idRubro: +rubro,
      },
    })
  }

  return {
    addCachedImage,
    addImage,
    cachedImage: cache.addedPhoto,
    clearServicio,
    createServicios,
    getServicioDetalle,
    getServicios,
    removeImage,
    servicio: cache.generarServicio,
    setDescripcion,
    setDireccion,
    setEmail,
    setNombre,
    setRubro,
    setTelefono,
    submitServicio,
  }
}
