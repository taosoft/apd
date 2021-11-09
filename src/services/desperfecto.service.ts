import axios from 'axios'

import { Response } from '../common/response'
import { baseUrl } from '../common/values'

export interface DesperfectoModel {
  idDesperfecto: number
  idRubro: number
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
