import axios from 'axios'

interface AddReclamo {
  lugar: string
  rubro: string
  desperfecto: string
  reason: string
  archivosURL: string
}

export interface ReclamoModel {
  idReclamo: number
  documento: string
  idSitio: number
  idDesperfecto: number
  descripcion: string
  estado: string
  fecha: Date
  archivosURL: string
  IdReclamoUnificado: number
  bitacora: string
}

export interface ReclamoResult {
  data: ReclamoModel[]
}

export default async function CreateReclamo(
  reclamo: AddReclamo,
): Promise<void> {
  try {
    await axios.post(
      'http://192.168.14.10:4000/reclamos',
      {
        ...reclamo,
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

export async function GetReclamos(): Promise<ReclamoModel[]> {
  try {
    const result = await axios.get<ReclamoResult>(
      'http://192.168.14.10:4000/reclamos',
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

export async function GetReclamo(idReclamo: number): Promise<ReclamoModel> {
  try {
    const result = await axios.get<ReclamoModel>(
      `http://192.168.14.10:4000/reclamos/${idReclamo}`,
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
