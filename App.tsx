import 'react-native-gesture-handler'

import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { CacheProvider } from './src/components/providers/useCache'
import useCachedResources from './src/hooks/useCachedResources'
import useColorScheme from './src/hooks/useColorScheme'
import Navigation from './src/navigation'

export default function App(): JSX.Element | null {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <CacheProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </CacheProvider>
      </SafeAreaProvider>
    )
  }
}
