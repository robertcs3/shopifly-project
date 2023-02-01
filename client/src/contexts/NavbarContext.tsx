import React, { createContext, PropsWithChildren, useMemo, useState } from 'react'


type NavbarContext = {
    handlePageChange : (page: string) => void
    variant: "dark" | "light";
    bg: "transparent" | "light";
}

export const NavbarContext = createContext({} as NavbarContext)
export default function NavbarProvider(props: PropsWithChildren<any>) {
    const [activePage, setActivePage] = useState(localStorage.getItem('activePage' || '/'));

    const handlePageChange = (page: string) => {
        setActivePage(page);
        localStorage.setItem('activePage', page);
      }

    const variant = useMemo(() => activePage === '/' ? 'dark' : 'light', [activePage]);
    const bg = useMemo(() => activePage === '/' ? 'transparent' : 'light', [activePage]);
    return (
        <NavbarContext.Provider value={{
            handlePageChange,
            variant,
            bg
        }}>
            {props.children}
        </NavbarContext.Provider>
    )
}
