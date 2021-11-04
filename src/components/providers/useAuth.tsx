import { useCache } from './useCache'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useAuth() {
  const { cache, changeCache } = useCache()

  async function setToken(token: string): Promise<void> {
    changeCache({
      token: token,
    })
  }

  return {
    setToken,
    token: cache.token,
  }
}
