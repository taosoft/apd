import axios from 'axios'

import { Response } from '../common/response'
import { baseUrl } from '../common/values'
import { RubroModel } from './rubro.service'

export interface ServicioModelDetalle {
  idServicio: number
  idRubro: number
  nombreServicio: string
  nombrePersona: string
  direccion: string
  telefono: string
  email: string
  horario: string
  descripcion: string
  archivosURL: string
  aprobado: string
  rubro: RubroModel
}
export interface ServicioModel {
  idServicio: number
  idRubro: number
  nombreServicio: string
  nombrePersona: string
  direccion: string
  telefono: string
  email: string
  horario: string
  descripcion: string
  archivosURL: string
  aprobado: string
}

export async function GetServicioDetalle(
  servicioId: number,
): Promise<ServicioModelDetalle> {
  try {
    const result = await axios.get<Response<ServicioModelDetalle>>(
      `${baseUrl}/servicios/detalle/${servicioId}`,
      {
        headers: {
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

export async function GetServicios(): Promise<ServicioModel[]> {
  try {
    const result = await axios.get<Response<ServicioModel[]>>(
      `${baseUrl}/servicios`,
      {
        headers: {
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

export async function CreateServicio(
  data: ServicioModel,
  token: string,
): Promise<ServicioModel> {
  try {
    const result = await axios.post<Response<ServicioModel>>(
      `${baseUrl}/servicios`,
      {
        data,
      },
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
