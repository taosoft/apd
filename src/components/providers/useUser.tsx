import {
  GetUser,
  UpdateUser,
  UpdateUserData,
  UserModel,
} from '../../services/user.service'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useUser() {
  async function getUser(documento: string): Promise<UserModel> {
    return await GetUser(documento)
  }

  async function updateUser(
    documento: string,
    updateData: UpdateUserData,
  ): Promise<boolean> {
    return await UpdateUser(documento, updateData)
  }

  return {
    getUser,
    updateUser,
  }
}
