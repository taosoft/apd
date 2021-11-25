import axios from 'axios'

import { Response } from '../common/response'
import { baseUrl } from '../common/values'
import { SitioModel } from './sitio.service'
import { UserModel } from './user.service'

interface AddDenuncia {
  date: string
  archivosURL: string
  documentoDenunciado: string
  isTermsAndConditions: boolean
  address: string
  name: string
  descripcion: string
}
export interface DenunciaModel {
  idDenuncia: number
  documento: string
  idDesperfecto: number
  descripcion: string
  estado: string
  fechaDenuncia: Date | string
  archivosURL: string | null
  bitacora: string
  aceptaResponsabilidad: number
}

export interface DenunciaModelDetalle {
  idDenuncia: number
  documento: string
  idDesperfecto: number
  descripcion: string
  estado: string
  fechaDenuncia: Date | string
  archivosURL: string | null
  bitacora: string
  aceptaResponsabilidad: number
  user: UserModel
  sitio: SitioModel
}

export default async function CreateDenuncia(
  denuncia: AddDenuncia,
  documento: string,
  token: string,
): Promise<void> {
  try {
    await axios.post<Response<DenunciaModel>>(
      `${baseUrl}/denuncias`,
      {
        ...denuncia,
        aceptaResponsabilidad: denuncia.isTermsAndConditions,
        documento: documento,
        fechaHecho: denuncia.date,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function GetDenuncias(token: string): Promise<DenunciaModel[]> {
  try {
    const result = await axios.get<Response<DenunciaModel[]>>(
      `${baseUrl}/denuncias/usuario`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    return result.data.data ?? []
  } catch (e) {
    console.log(e)
    return []
  }
}

export async function GetDenuncia(
  idDenuncia: number,
  token: string,
): Promise<DenunciaModelDetalle> {
  try {
    const result = await axios.get<Response<DenunciaModelDetalle>>(
      `${baseUrl}/denuncias/detalle/${idDenuncia}`,
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
