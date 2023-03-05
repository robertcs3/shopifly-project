import { createContext, PropsWithChildren, ReactComponentElement, ReactFragment, useState } from 'react'
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

type ButtonContext = {
    isLoading: boolean,
    setIsLoading: (value: boolean) => void,
    displaySpinner: () => JSX.Element,
}

export const ButtonContext = createContext({} as ButtonContext)

export default function ButtonProvider(props: PropsWithChildren<any>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const displaySpinner = () => {
      return (
        <Button variant='primary'  disabled>
                 <Spinner
                 as="span"
                 animation="border"
                 role="status"
                 aria-hidden="true"
                 size="sm"
                              />
               </Button>
      )
    }

  return (
    <ButtonContext.Provider value={{
        isLoading,
        setIsLoading,
        displaySpinner,
    }}>{props.children}</ButtonContext.Provider>
  )
}
