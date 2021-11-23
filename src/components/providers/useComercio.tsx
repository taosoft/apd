import {
  ComercioModel,
  CreateComercio,
  GetComercioDetalle,
  GetComercios,
} from '../../services/comercio.service'
import useAuth from './useAuth'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useComercio() {
  const { token } = useAuth()

  async function getComercioDetalle(
    comercioId: number,
  ): Promise<ComercioModel> {
    return await GetComercioDetalle(comercioId)
  }

  async function getComercios(): Promise<ComercioModel[]> {
    return await GetComercios()
  }

  async function createComercios(data: ComercioModel): Promise<ComercioModel> {
    return await CreateComercio(data, token)
  }

  return {
    createComercios,
    getComercioDetalle,
    getComercios,
  }
}
