import axios from 'axios'

import { Response } from '../common/response'
import { baseUrl } from '../common/values'
interface AddDenuncia {
  // verificar si los campos declarddos son los correctos datos
  date: string
  archivosURL: string
  isTermsAndConditions: boolean
  address: string
  name: string
  reason: string
}
export interface DenunciaModel {
  // verificar si los campos declarddos son los correctos datos
  idDenuncia: number
  documento: string
  idDesperfecto: number
  descripcion: string
  estado: string
  fecha: Date
  archivosURL: string
  bitacora: string
}

export default async function CreateDenuncia(
  denuncia: AddDenuncia,
): Promise<void> {
  try {
    await axios.post<Response<DenunciaModel>>(
      `${baseUrl}/denuncias`,
      {
        ...denuncia,
        documento: '12345678',
        idDesperfecto: '1',
        idSitio: '1',
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function GetDenuncias(): Promise<DenunciaModel[]> {
  try {
    const result = await axios.get<Response<DenunciaModel[]>>(
      `${baseUrl}/denuncias`,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
    console.log(result.data.data)
    return result.data.data
  } catch (e) {
    console.log(e)
    return []
  }
}

export async function GetDenuncia(idDenuncia: number): Promise<DenunciaModel> {
  try {
    const result = await axios.get<Response<DenunciaModel>>(
      `${baseUrl}/denuncias/${idDenuncia}`,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
    return result.data.data
  } catch (e) {
    console.log(e)
    throw e
  }
}
