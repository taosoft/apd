/*
 
¡¡¡¡Atencion!!!! Lo de este archivo lo copie y pegue desde reclamo.service.ts
Le cambie cada lugar que decia reclamo/reclamos por denuncia/denuncias y nada mas.
Hay que revisar que lo demas este todo en orden.
 
*/

import axios from 'axios'

interface AddDenuncia {
  // verificar si los campos declarddos son los correctos datos
  address: string
  date: string
  images: []
  isTermsAndConditions: false
  name: string
  reason: string
}

export interface DenunciaModel {
  // verificar si los campos declarddos son los correctos datos
  idDenuncia: number
  documento: string
  idDesperfecto: number
  descripcion: string
  estado: string
  fecha: Date
  archivosURL: string
  bitacora: string
}

export interface DenunciaResult {
  data: DenunciaModel[]
}

export default async function CreateDenuncia(
  denuncia: AddDenuncia,
): Promise<void> {
  try {
    await axios.post(
      'http://192.168.14.10:4000/denuncias',
      {
        ...denuncia,
        documento: '12345678',
        idDesperfecto: '1',
        idSitio: '1',
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (e) {
    console.log(e)
  }
}

export async function GetDenuncias(): Promise<DenunciaModel[]> {
  try {
    const result = await axios.get<DenunciaResult>(
      'http://192.168.14.10:4000/denuncias',
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
    return result.data.data
  } catch (e) {
    console.log(e)
    return []
  }
}

export async function GetDenuncia(idDenuncia: number): Promise<DenunciaModel> {
  try {
    const result = await axios.get<DenunciaModel>(
      `http://192.168.14.10:4000/denuncias/${idDenuncia}`,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
    return result.data
  } catch (e) {
    console.log(e)
    throw e
  }
}
