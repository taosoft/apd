import { useCache } from './useCache'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useAuth() {
  const { cache, changeCache } = useCache()

  async function setToken(token: string): Promise<void> {
    changeCache({
      token: token,
    })
  }

  async function setLoginResponse(
    token: string,
    documento: string,
    isInspector: boolean,
  ): Promise<void> {
    changeCache({
      documento: documento,
      isInspector: isInspector,
      token: token,
    })
  }

  function setDocumento(documento: string): void {
    changeCache({
      documento: documento,
    })
  }

  return {
    documento: cache.documento ?? '',
    isInspector: cache.isInspector,
    setDocumento,
    setLoginResponse,
    setToken,
    token: cache.token ?? '',
  }
}
