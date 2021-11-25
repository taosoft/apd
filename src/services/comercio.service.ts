import axios from 'axios'

import { Response } from '../common/response'
import { baseUrl } from '../common/values'

export interface ComercioModel {
  idComercio: number
  nombre: string
  horario: string
  descripcion: string
  archivosURL: string
  aprobado: string
}
export interface AddComercio {
  nombre: string
  horario: string
  descripcion: string
  archivosURL: string
}

export async function GetComercioDetalle(
  comercioId: number,
): Promise<ComercioModel> {
  try {
    const result = await axios.get<Response<ComercioModel>>(
      `${baseUrl}/comercios/${comercioId}`,
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

export async function GetComercios(): Promise<ComercioModel[]> {
  try {
    const result = await axios.get<Response<ComercioModel[]>>(
      `${baseUrl}/comercios`,
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

export async function CreateComercio(
  data: AddComercio,
  token: string,
): Promise<ComercioModel> {
  try {
    const result = await axios.post<Response<ComercioModel>>(
      `${baseUrl}/comercios`,
      {
        ...data,
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
