import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'

export function TabBarIcon(props: {
  name: React.ComponentProps<typeof Icon>['name']
  color: string
}): JSX.Element {
  // eslint-disable-next-line react-native/no-inline-styles
  return <Icon size={30} style={{ marginBottom: -3 }} {...props} />
}
