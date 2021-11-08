import {
  GetUser,
  UpdateUser,
  UpdateUserData,
  UserModel,
} from '../../services/user.service'
import useAuth from './useAuth'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useUser() {
  const { token } = useAuth()
  async function getUser(documento: string): Promise<UserModel> {
    return await GetUser(documento, token)
  }

  async function updateUser(
    documento: string,
    updateData: UpdateUserData,
  ): Promise<boolean> {
    return await UpdateUser(documento, updateData, token)
  }

  return {
    getUser,
    updateUser,
  }
}
