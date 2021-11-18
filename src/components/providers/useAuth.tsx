import { useCache } from './useCache'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useAuth() {
  const { cache, changeCache } = useCache()

  async function setToken(token: string): Promise<void> {
    changeCache({
      token: token,
    })
  }
  
  async function setLoginResponse(token: string, documento: string): Promise<void> {
    changeCache({
      token: token,
      documento: documento,
    })
  }

  function setDocumento(documento: string): void {
    changeCache({
      documento: documento,
    })
  }

  return {
    documento: cache.documento ?? '',
    setDocumento,
    setToken,
    setLoginResponse,
    token: cache.token ?? '',
  }
}
