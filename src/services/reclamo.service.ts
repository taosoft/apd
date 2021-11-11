import axios from 'axios'

import { Response } from '../common/response'
import { baseUrl } from '../common/values'
import { DesperfectoModel } from '../services/desperfecto.service'
import { SitioModel } from '../services/sitio.service'
import { UserModel } from '../services/user.service'

interface AddReclamo {
  idSitio: number
  idDesperfecto: number
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
export interface ReclamoDetalleModel {
  idReclamo: number
  user: UserModel
  documento: string
  sitio: SitioModel
  desperfecto: DesperfectoModel
  descripcion: string
  estado: string
  fecha: Date
  archivosURL: string
  IdReclamoUnificado: number
  bitacora: string
}

export default async function CreateReclamo(
  reclamo: AddReclamo,
  token: string,
): Promise<ReclamoModel> {
  try {
    const response = await axios.post<Response<ReclamoModel>>(
      `${baseUrl}/reclamos`,
      {
        ...reclamo,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    console.log(response.data)
    return response.data.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function GetReclamos(
  token: string,
): Promise<ReclamoDetalleModel[]> {
  try {
    const result = await axios.get<Response<ReclamoDetalleModel[]>>(
      `${baseUrl}/reclamos`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    return result.data.data
  } catch (e) {
    console.log(e)
    return []
  }
}

export async function GetReclamo(
  idReclamo: number,
  token: string,
): Promise<ReclamoModel> {
  try {
    const result = await axios.get<Response<ReclamoModel>>(
      `${baseUrl}/reclamos/${idReclamo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    return result.data.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function GetReclamoDetalle(
  idReclamo: number,
  token: string,
): Promise<ReclamoDetalleModel> {
  try {
    const result = await axios.get<Response<ReclamoDetalleModel>>(
      `${baseUrl}/reclamos/detalle/${idReclamo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    return result.data.data
  } catch (e) {
    console.log(e)
    throw e
  }
}
