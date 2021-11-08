import { GetUser, UserModel } from '../../services/user.service'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useUser() {
  async function getUser(documento: string): Promise<UserModel> {
    return await GetUser(documento)
  }

  return {
    getUser,
  }
}
