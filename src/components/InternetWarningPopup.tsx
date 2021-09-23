import { Alert } from 'react-native'

export interface PopupAlert {
  name: string
  onPressYes: () => void
  onPressNo: () => void
}

export const InternetWarningPopup = (popupAlert: PopupAlert): void => {
  return Alert.alert(
    `No está conectado a una red Wi-Fi, ¿desea generar ${popupAlert.name} con los datos móviles?`,
    `En caso de optar por “SI” podrá tener un recargo a pagar por usar los datos del celular. Si opta por “NO”, se generará ${popupAlert.name} una vez que esté conectado a una red Wi-Fi`,
    [
      {
        onPress: () => popupAlert.onPressNo,
        style: 'cancel',
        text: 'NO',
      },
      { onPress: () => popupAlert.onPressYes, text: 'SI' },
    ],
    { cancelable: false },
  )
}
