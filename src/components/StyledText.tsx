import * as React from 'react'

import { Text, TextProps } from './Themed'

export function MonoText(props: TextProps): JSX.Element {
  // eslint-disable-next-line react-native/no-inline-styles
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
}
