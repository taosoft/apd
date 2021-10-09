export type RootStackParamList = {
  Inicio: undefined
  Registrarse: undefined
  LoginStack: undefined
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
  TabInicioScreen: {
    authenticated: boolean
  }
  ComerciosStack: {
    authenticated: boolean
  }
  ServiciosStack: {
    authenticated: boolean
  }
  DenunciasStack: {
    authenticated: boolean
  }
  ReclamosStack: {
    authenticated: boolean
  }
}

export type TabNotificacionesParamList = {
  TabNotificacionesScreen: undefined
}
