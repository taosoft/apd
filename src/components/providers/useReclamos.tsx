import {
  cloudinaryUpload,
  UploadImageResponse,
} from '../../services/image.service'
import { GenerateType, useCache } from './useCache'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useReclamos() {
  const { cache, changeCache } = useCache()

  async function submitReclamo(): Promise<void> {
    const uploadImagesResponses = uploadImages()
    console.log(uploadImagesResponses)
    clearReclamo()
  }

  async function uploadImages(): Promise<UploadImageResponse[]> {
    return await Promise.all<UploadImageResponse>(
      cache.generarReclamo.images.map(async (image) => {
        return await cloudinaryUpload(image, GenerateType.RECLAMO)
      }),
    )
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
    reclamo: cache.generarReclamo,
    removeImage,
    submitReclamo,
  }
}
