import {
  GetNotificaciones,
  NotificacionesModel,
  UpdateNotificaciones,
} from '../../services/notificaciones.service'
import useAuth from './useAuth'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useNotificaciones() {
  const { token } = useAuth()
  async function getNotificaciones(
    documento: string,
  ): Promise<NotificacionesModel[]> {
    return await GetNotificaciones(documento, token)
  }

  async function updateNotificaciones(
    notificacionId: number,
  ): Promise<boolean> {
    return await UpdateNotificaciones(notificacionId, token)
  }

  return {
    getNotificaciones,
    updateNotificaciones,
  }
}
