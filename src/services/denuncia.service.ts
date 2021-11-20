import axios from 'axios'

import { Response } from '../common/response'
import { baseUrl } from '../common/values'
import useAuth from '../components/providers/useAuth'

interface AddDenuncia {
  // verificar si los campos declarddos son los correctos datos
  date: string
  archivosURL: string
  isTermsAndConditions: boolean
  address: string
  name: string
  descripcion: string
}
export interface DenunciaModel {
  // verificar si los campos declarddos son los correctos datos
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

export default async function CreateDenuncia(
  denuncia: AddDenuncia,
  token: string,
): Promise<void> {
  const { documento } = useAuth()
  try {
    await axios.post<Response<DenunciaModel>>(
      `${baseUrl}/denuncias`,
      {
        ...denuncia,
        aceptaResponsabilidad: denuncia.isTermsAndConditions,
        documento: documento,
        fechaHecho: denuncia.date,
        idSitio: '1',
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
): Promise<DenunciaModel> {
  try {
    const result = await axios.get<Response<DenunciaModel>>(
      `${baseUrl}/denuncias/${idDenuncia}`,
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
