import React, { createContext, PropsWithChildren, useState } from 'react'

type ButtonContext = {
    isLoading: boolean,
    setIsLoading: (value: boolean) => void,
}

export const ButtonContext = createContext({} as ButtonContext)

export default function ButtonProvider(props: PropsWithChildren<any>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    

  return (
    <ButtonContext.Provider value={{
        isLoading,
        setIsLoading
    }}>{props.children}</ButtonContext.Provider>
  )
}
