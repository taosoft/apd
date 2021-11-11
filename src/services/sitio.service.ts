import axios from 'axios'

import { Response } from '../common/response'
import { baseUrl } from '../common/values'

export interface SitioModel {
  idSitio: string
  latitud: number
  calle: string
  numero: number
  entreCalleA: string
  entreCalleB: string
  descripcion: string
  aCargoDe: string
  apertura: string
  cierre: string
  comentarios: string
}

export async function GetSitio(
  idSitio: number,
  token: string,
): Promise<SitioModel> {
  try {
    const result = await axios.get<Response<SitioModel>>(
      `${baseUrl}/sitios/${idSitio}`,
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

export async function GetSitios(token: string): Promise<SitioModel[]> {
  try {
    const result = await axios.get<Response<SitioModel[]>>(
      `${baseUrl}/sitios`,
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
