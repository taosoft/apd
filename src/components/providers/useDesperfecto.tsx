import {
  DesperfectoModel,
  GetDesperfecto,
} from '../../services/desperfecto.service'
import useAuth from './useAuth'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useDesperfecto() {
  const { token } = useAuth()
  async function getDesperfecto(
    idDesperfecto: number,
  ): Promise<DesperfectoModel> {
    return await GetDesperfecto(idDesperfecto, token)
  }
  return {
    getDesperfecto,
  }
}
