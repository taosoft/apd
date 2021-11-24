import 'react-native-gesture-handler'

import { Logs } from 'expo'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { CacheProvider } from './src/components/providers/useCache'
import { CronProvider } from './src/components/providers/useCron'
import { CounterProvider } from './src/components/providers/useNotificationBadge'
import useCachedResources from './src/hooks/useCachedResources'
import useColorScheme from './src/hooks/useColorScheme'
import Navigation from './src/navigation'

export default function App(): JSX.Element | null {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()
  Logs.enableExpoCliLogging()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <CronProvider>
          <CacheProvider>
            <CounterProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </CounterProvider>
          </CacheProvider>
        </CronProvider>
      </SafeAreaProvider>
    )
  }
}
