import { GetRubros, RubroModel } from '../../services/rubro.service'
import useAuth from './useAuth'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useRubros() {
  const { token } = useAuth()

  async function getRubros(): Promise<RubroModel[]> {
    return await GetRubros(token)
  }

  return {
    getRubros,
  }
}
