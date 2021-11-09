import { GetSitio, SitioModel } from '../../services/sitio.service'
import useAuth from './useAuth'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useSitio() {
  const { token } = useAuth()
  async function getSitio(idSitio: number): Promise<SitioModel> {
    return await GetSitio(idSitio, token)
  }
  return {
    getSitio,
  }
}
