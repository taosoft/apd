import axios from 'axios'

import { Response } from '../common/response'
import { baseUrl } from '../common/values'

interface AddReclamo {
  lugar: string
  rubro: string
  desperfecto: string
  reason: string
  archivosURL: string
}

export interface ReclamoModel {
  idReclamo: number
  documento: string
  idSitio: number
  idDesperfecto: number
  descripcion: string
  estado: string
  fecha: Date
  archivosURL: string
  IdReclamoUnificado: number
  bitacora: string
}

export default async function CreateReclamo(
  reclamo: AddReclamo,
): Promise<ReclamoModel> {
  try {
    const response = await axios.post<Response<ReclamoModel>>(
      `${baseUrl}/reclamos`,
      {
        ...reclamo,
        documento: '12345678',
        idDesperfecto: '1',
        idSitio: '1',
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
    console.log(response.data)
    return response.data.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function GetReclamos(): Promise<ReclamoModel[]> {
  try {
    const result = await axios.get<Response<ReclamoModel[]>>(
      `${baseUrl}/reclamos`,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
    return result.data.data
  } catch (e) {
    console.log(e)
    return []
  }
}

export async function GetReclamo(idReclamo: number): Promise<ReclamoModel> {
  try {
    const result = await axios.get<Response<ReclamoModel>>(
      `${baseUrl}/reclamos/${idReclamo}`,
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
