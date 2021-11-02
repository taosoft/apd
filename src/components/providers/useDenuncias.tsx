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
    clearDenuncia()
  }

  async function uploadImages(): Promise<UploadImageResponse[]> {
    return await Promise.all<UploadImageResponse>(
      cache.generarDenuncia.images.map(async (image) => {
        return await cloudinaryUpload(image, GenerateType.DENUNCIA)
      }),
    )
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
    removeImage,
    submitDenuncia,
  }
}
