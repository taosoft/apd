import axios from 'axios'

interface AddReclamo {
  lugar: string
  rubro: string
  desperfecto: string
  reason: string
  archivosURL: string
}

export default async function CreateReclamo(
  reclamo: AddReclamo,
): Promise<void> {
  try {
    await axios.post(
      'http://192.168.0.25:4000/reclamos',
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
