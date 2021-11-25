import {
  GetUser,
  ResetPassword,
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

  async function updateUser(updateData: UpdateUserData): Promise<boolean> {
    return await UpdateUser(updateData, token)
  }

  async function resetPassword(documento: string): Promise<boolean> {
    return await ResetPassword(documento)
  }

  return {
    getUser,
    resetPassword,
    updateUser,
  }
}
