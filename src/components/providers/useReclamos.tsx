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

  async function submitReclamo(): Promise<void> {
    const uploadImagesResponses = await uploadImages()
    console.log(uploadImagesResponses)
    CreateReclamo({
      ...cache.generarReclamo,
      archivosURL: uploadImagesResponses
        .map((imagen) => imagen.response?.secure_url ?? '')
        .join(';'),
    })
    clearReclamo()
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
    getReclamos,
    reclamo: cache.generarReclamo,
    removeImage,
    submitReclamo,
  }
}
