import React, { createContext, useContext, useState } from 'react'

type CounterContextProps = {
  counter: number | undefined
  changeCounter: (num: number) => void
}

export const CounterContext = createContext({
  changeCounter: () => null,
  counter: undefined,
} as CounterContextProps)

interface CounterProviderProps {
  children: React.ReactNode
}

export function CounterProvider({
  children,
}: CounterProviderProps): JSX.Element {
  const [counter, setCounter] = useState<number | undefined>(undefined)

  function changeCounter(num: number) {
    setCounter(num)
  }

  return (
    <CounterContext.Provider value={{ changeCounter, counter }}>
      {children}
    </CounterContext.Provider>
  )
}

export function useBadge(): CounterContextProps {
  const { counter, changeCounter } = useContext(CounterContext)

  return {
    changeCounter,
    counter,
  }
}
