import { GetSitios, SitioModel } from '../../services/sitio.service'
import useAuth from './useAuth'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useSitio() {
  const { token } = useAuth()
  async function getSitios(): Promise<SitioModel> {
    return await GetSitios(token)
  }
  return {
    getSitios,
  }
}
