import axios from 'axios'

import { Response } from '../common/response'
import { baseUrl } from '../common/values'

export interface NotificacionesModel {
  id: number
  documento: string
  idGestion: number
  descripcion: string
  visto: number
}

export async function GetNotificaciones(
  documento: string,
  token: string,
): Promise<NotificacionesModel[]> {
  try {
    const result = await axios.get<Response<NotificacionesModel[]>>(
      `${baseUrl}/notificaciones/${documento}`,
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

export async function UpdateNotificaciones(
  notificacionId: number,
  token: string,
): Promise<boolean> {
  try {
    const result = await axios.patch<Response<boolean>>(
      `${baseUrl}/notificaciones/${notificacionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    return result ? true : false
  } catch (e) {
    console.log(e)
    throw e
  }
}
