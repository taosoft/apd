/*
 
¡¡¡¡Atencion!!!! Lo de este archivo lo copie y pegue desde reclamo.service.ts
Le cambie cada lugar que decia reclamo/reclamos por denuncia/denuncias y nada mas.
Hay que revisar que lo demas este todo en orden.
 
*/

import CreateDenuncia, {
  DenunciaModel,
  GetDenuncia,
  GetDenuncias,
} from '../../services/denuncia.service'
import {
  cloudinaryUpload,
  UploadImageResponse,
} from '../../services/image.service'
import { GenerateType, useCache } from './useCache'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useDenuncias() {
  const { cache, changeCache } = useCache()

  async function submitDenuncia(): Promise<void> {
    const uploadImagesResponses = uploadImages()
    console.log(uploadImagesResponses)
    CreateDenuncia({
      ...cache.generarReclamo,
      archivosURL: uploadImagesResponses
        .map((imagen) => imagen.response?.secure_url ?? '')
        .join(';'),
    })
    clearDenuncia()
  }

  async function uploadImages(): Promise<UploadImageResponse[]> {
    return await Promise.all<UploadImageResponse>(
      cache.generarDenuncia.images.map(async (image) => {
        return await cloudinaryUpload(image, GenerateType.DENUNCIA)
      }),
    )
  }

  async function getDenuncias(): Promise<DenunciaModel[]> {
    return await GetDenuncias()
  }

  async function getDenuncia(idReclamo: number): Promise<DenunciaModel> {
    return await GetDenuncia(idReclamo)
  }

  function clearDenuncia(): void {
    changeCache({
      generarDenuncia: {
        address: '',
        date: '',
        images: [],
        isTermsAndConditions: false,
        name: '',
        reason: '',
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
    submitDenuncia,
  }
}
