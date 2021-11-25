import { Alert } from 'react-native'

import CreateDenuncia, {
  DenunciaModel,
  GetDenuncia,
  GetDenuncias,
} from '../../services/denuncia.service'
import {
  cloudinaryUpload,
  UploadImageResponse,
} from '../../services/image.service'
import useAuth from './useAuth'
import { GenerateType, useCache } from './useCache'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useDenuncias() {
  const { cache, changeCache } = useCache()
  const { token, documento } = useAuth()

  async function submitDenuncia(): Promise<boolean> {
    const uploadImagesResponses = await uploadImages()
    try {
      CreateDenuncia(
        {
          ...cache.generarDenuncia,
          archivosURL: uploadImagesResponses
            .map((imagen) => imagen.response?.secure_url ?? '')
            .join(';'),
        },
        documento,
        token,
      )
      clearDenuncia()
      return true
    } catch (e) {
      Alert.alert(e)
      return false
    }
  }

  async function uploadImages(): Promise<UploadImageResponse[]> {
    return await Promise.all<UploadImageResponse>(
      cache.generarDenuncia.images.map(async (image) => {
        return await cloudinaryUpload(image, GenerateType.DENUNCIA)
      }),
    )
  }

  async function getDenuncias(): Promise<DenunciaModel[]> {
    return await GetDenuncias(token)
  }

  async function getDenuncia(idReclamo: number): Promise<DenunciaModel> {
    return await GetDenuncia(idReclamo, token)
  }

  function clearDenuncia(): void {
    changeCache({
      generarDenuncia: {
        address: '',
        date: '',
        descripcion: '',
        idSitio: 0,
        images: [],
        isTermsAndConditions: false,
        name: '',
      },
    })
  }

  function setLugar(lugar: string): void {
    changeCache({
      generarDenuncia: {
        ...cache.generarDenuncia,
        idSitio: +lugar,
      },
    })
  }

  function setDenunciaDate(date: string): void {
    changeCache({
      generarDenuncia: {
        ...cache.generarDenuncia,
        date: date,
      },
    })
  }

  function setDenunciaName(name: string): void {
    changeCache({
      generarDenuncia: {
        ...cache.generarDenuncia,
        name: name,
      },
    })
  }
  function setDenunciaAddress(address: string): void {
    changeCache({
      generarDenuncia: {
        ...cache.generarDenuncia,
        address: address,
      },
    })
  }

  function setDenunciaReason(descripcion: string): void {
    changeCache({
      generarDenuncia: {
        ...cache.generarDenuncia,
        descripcion: descripcion,
      },
    })
  }
  function setIsTermsAndConditions(isTermsAndConditions: boolean): void {
    changeCache({
      generarDenuncia: {
        ...cache.generarDenuncia,
        isTermsAndConditions: isTermsAndConditions,
      },
    })
  }

  function addCachedImage(): void {
    if (cache.addedPhoto) {
      const image = cache.addedPhoto
      changeCache({
        addedPhoto: undefined,
        generarDenuncia: {
          ...cache.generarDenuncia,
          images: [...cache.generarDenuncia.images, image],
        },
      })
    }
  }

  function addImage(uri: string): void {
    changeCache({
      generarDenuncia: {
        ...cache.generarDenuncia,
        images: [...cache.generarDenuncia.images, uri],
      },
    })
  }

  function removeImage(index: number): void {
    changeCache({
      generarDenuncia: {
        ...cache.generarDenuncia,
        images: [
          ...cache.generarDenuncia.images.slice(0, index),
          ...cache.generarDenuncia.images.slice(index + 1),
        ],
      },
    })
  }

  return {
    addCachedImage,
    addImage,
    cachedImage: cache.addedPhoto,
    denuncia: cache.generarDenuncia,
    getDenuncia,
    getDenuncias,
    removeImage,
    setDenunciaAddress,
    setDenunciaDate,
    setDenunciaName,
    setDenunciaReason,
    setIsTermsAndConditions,
    setLugar,
    submitDenuncia,
  }
}
