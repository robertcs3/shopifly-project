import React, { createContext, PropsWithChildren, useMemo, useState } from 'react'


type NavbarContext = {
    variant: "dark" | "light";
    bg: "transparent" | "light";
    setLocation: (location: string) => void
}

export const NavbarContext = createContext({} as NavbarContext)
export default function NavbarProvider(props: PropsWithChildren<any>) {
    const [location, setCurrentLocation] = useState('');

    const setLocation = (location: string) => {
        console.log(location)
        setCurrentLocation(location);
      
    }

    const variant = useMemo(() => location === '/' ? 'dark' : 'light', [location]);
    const bg = useMemo(() => location === '/' ? 'transparent' : 'light', [location]);
    
    return (
        <NavbarContext.Provider value={{
            variant,
            bg,
            setLocation,
        }}>
            {props.children}
        </NavbarContext.Provider>
    )
}
