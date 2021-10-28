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
  ComercioDetalle: undefined
  ComercioGenerar: undefined
  CameraPicker: undefined
  ServicioListado: {
    authenticated: boolean
  }
  ServicioDetalle: undefined
  ServicioGenerar: undefined
  DenunciaListado: {
    authenticated: boolean
  }
  DenunciaDetalle: undefined
  DenunciaGenerar: undefined
  ReclamoListado: {
    authenticated: boolean
  }
  ReclamoDetalle: undefined
  ReclamoGenerar: undefined
}

export type TabNotificacionesParamList = {
  TabNotificacionesScreen: undefined
}
