import {
  CreateServicio,
  GetServicioDetalle,
  GetServicios,
  ServicioModel,
  ServicioModelDetalle,
} from '../../services/servicios.service'
import useAuth from './useAuth'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useServicio() {
  const { token } = useAuth()

  async function getServicioDetalle(
    comercioId: number,
  ): Promise<ServicioModelDetalle> {
    return await GetServicioDetalle(comercioId)
  }

  async function getServicios(): Promise<ServicioModel[]> {
    return await GetServicios()
  }

  async function createServicios(data: ServicioModel): Promise<ServicioModel> {
    return await CreateServicio(data, token)
  }

  return {
    createServicios,
    getServicioDetalle,
    getServicios,
  }
}
