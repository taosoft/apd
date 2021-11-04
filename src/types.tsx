export type RootStackParamList = {
  Inicio: undefined
  Registrarse: undefined
  Login: undefined
  FinalizaRegistro: undefined
  AuthenticatedStack: undefined
  UnauthenticatedStack: undefined
  BottomTab: undefined
  NotFound: undefined
}

export type BottomTabParamList = {
  Perfil: undefined
  Inicio: undefined
  Notificaciones: undefined
}

export type TabPerfilParamList = {
  TabPerfilScreen: undefined
}

export type TabInicioParamList = {
  Bienvenido: {
    authenticated: boolean
  }
  ComercioListado: {
    authenticated: boolean
  }
  ComercioDetalle: {
    id: number
  }
  ComercioGenerar: undefined
  CameraPicker: undefined
  ServicioListado: {
    authenticated: boolean
  }
  ServicioDetalle: {
    id: number
  }
  ServicioGenerar: undefined
  DenunciaListado: {
    authenticated: boolean
  }
  DenunciaDetalle: {
    id: number
  }
  DenunciaGenerar: undefined
  ReclamoListado: {
    authenticated: boolean
  }
  ReclamoDetalle: {
    id: number
  }
  ReclamoGenerar: undefined
}

export type TabNotificacionesParamList = {
  Notificaciones: { authenticated: boolean }
}
