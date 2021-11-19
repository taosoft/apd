import axios from 'axios'

import { Response } from '../common/response'
import { baseUrl } from '../common/values'

export interface UserModel {
  documento: string
  nombre: string
  apellido: string
  email: string
  constraseña: string
  inspector: number
}
export interface UpdateUserData {
  email: string
  contraseña: string
}

export async function GetUser(
  documento: string,
  token: string,
): Promise<UserModel> {
  try {
    const result = await axios.get<Response<UserModel>>(
      `${baseUrl}/users/${documento}`,
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

export async function UpdateUser(
  documento: string,
  updateData: UpdateUserData,
  token: string,
): Promise<boolean> {
  try {
    const result = await axios.put<Response<boolean>>(
      `${baseUrl}/users/${documento}`,
      {
        updateData,
      },
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
