import axios from 'axios'
import * as FileSystem from 'expo-file-system'

import { GenerateType } from '../components/providers/useCache'

const uploadPresets: { [key: string]: string } = {
  [GenerateType.DENUNCIA]: 'xqqppdv8',
  [GenerateType.RECLAMO]: 'acc9jkjm',
  [GenerateType.SERVICIO]: 'eqqi3muh',
  [GenerateType.COMERCIO]: 'aigw9e9y',
}

export async function cloudinaryUpload(
  uri: string,
  type: GenerateType,
): Promise<UploadImageResponse> {
  const fileBase64 = await FileSystem.readAsStringAsync(uri, {
    encoding: 'base64',
  })

  const data = {
    file: `data:image/jpg;base64,${fileBase64}`,
    upload_preset: uploadPresets[type],
  }

  try {
    const result = await axios.post(
      'https://api.cloudinary.com/v1_1/apd-2021-uade/image/upload',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    console.log(result)
    if (result.status === 200) {
      return {
        response: result.data,
        success: true,
      }
    } else {
      return {
        success: false,
      }
    }
  } catch (e) {
    console.log(e)
    return {
      success: false,
    }
  }
}

export interface UploadImageResponse {
  success: boolean
  response?: CloudinaryResponse
}

export interface CloudinaryResponse {
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  tags: string[]
  bytes: number
  type: string
  etag: string
  placeholder: false
  url: string
  secure_url: string
  access_mode: string
}
