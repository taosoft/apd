import axios from 'axios'

import { Response } from '../common/response'
import { baseUrl } from '../common/values'
import { RubroModel } from './rubro.service'

export interface DesperfectoModel {
  idDesperfecto: number
  idRubro: number
  descripcion: string
}
export interface DesperfectoDetalleModel {
  idDesperfecto: number
  rubro: RubroModel
  descripcion: string
}

export async function GetDesperfecto(
  idDesperfecto: number,
  token: string,
): Promise<DesperfectoModel> {
  try {
    const result = await axios.get<Response<DesperfectoModel>>(
      `${baseUrl}/desperfectos/${idDesperfecto}`,
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

export async function GetDesperfectos(
  token: string,
): Promise<DesperfectoModel[]> {
  try {
    const result = await axios.get<Response<DesperfectoModel[]>>(
      `${baseUrl}/desperfectos`,
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
