/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { noop } from 'lodash'
import * as React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text as DefaultText,
  TouchableOpacity,
  View as DefaultView,
} from 'react-native'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
): string {
  const theme = useColorScheme()
  const colorFromProps = props[theme]

  if (colorFromProps) {
    return colorFromProps
  } else {
    return Colors[theme][colorName]
  }
}

type ThemeProps = {
  lightColor?: string
  darkColor?: string
}

type LoadingButtonProps = {
  isLoading?: boolean
  text: string
  onPress: () => Promise<void> | void
}

export type TextProps = ThemeProps & DefaultText['props']
export type ViewProps = ThemeProps & DefaultView['props']
export type ButtonProps = LoadingButtonProps & ThemeProps & DefaultView['props']

export function Text(props: TextProps): JSX.Element {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ dark: darkColor, light: lightColor }, 'text')

  return <DefaultText style={[{ color }, style]} {...otherProps} />
}

export function View(props: ViewProps): JSX.Element {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor(
    { dark: darkColor, light: lightColor },
    'background',
  )

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}

export function Button(props: ButtonProps): JSX.Element {
  return (
    <TouchableOpacity
      onPress={props.isLoading ? noop : props.onPress}
      style={styles.button}
    >
      {props.isLoading ? (
        <ActivityIndicator animating={true} color={'white'} size={'large'} />
      ) : (
        <Text style={{color: 'white'}}>{props.text}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#409DC4',
    borderColor: '#FFF',
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
    paddingBottom: 10,
    paddingTop: 10,
    width: 300,
  },
})
