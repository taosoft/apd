import axios from 'axios'

import { Response } from '../common/response'
import { baseUrl } from '../common/values'

export interface RubroModel {
  idRubro: string
  descripcion: string
}

export async function GetRubros(token: string): Promise<RubroModel> {
  try {
    const result = await axios.get<Response<RubroModel>>(`${baseUrl}/rubros/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return result.data.data
  } catch (e) {
    console.log(e)
    throw e
  }
}
