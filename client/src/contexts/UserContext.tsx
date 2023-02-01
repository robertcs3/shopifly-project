import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import Axios, { AxiosResponse } from 'axios'
import { UserInterface } from '../interfaces/UserInterface'

type UserContext = {
  user: UserInterface | undefined
  login: (username: string, password: string) => Promise<any>
  register: (username: string, password: string) => Promise<any>
  logout: () => Promise<any>
  verifyAdmin: (secret: number, userId: string) => Promise<any>
}

export const UserContext = createContext({} as UserContext)
export default function UserProvider(props: PropsWithChildren<any>) {
  const [user, setUser] = useState<UserInterface>();
  /* get user on first render */
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    await Axios.get(`${import.meta.env.VITE_API_URL}/user`, { withCredentials: true }).then((res: AxiosResponse) => {
      setUser(res.data);
    }).catch(err => {
    })
  }

  /* login user */
  const login = async (username: string, password: string) => {
    return await Axios.post(`${import.meta.env.VITE_API_URL}/user/login`, {
      username,
      password
    }, {
      withCredentials: true
    }).then((res: AxiosResponse) => {
      res.data
    }, () => {
      return ('failure')
    })
  }

  /* register user */
  const register = async (username: string, password: string) => {

    return await Axios.post(`${import.meta.env.VITE_API_URL}/user/register`, {
      username,
      password
    }, {
      withCredentials: true
    }).then((res: AxiosResponse) => res.data)

  }

  /* logout user */
  const logout = async () => {
    return await Axios.get(`${import.meta.env.VITE_API_URL}/user/logout`, {
      withCredentials: true,
    }).then((res: AxiosResponse) => res.data)
  }

  /* verify and grant admin privileges */
  const verifyAdmin = async (secret: number, userId: string) => {
    if (secret === 1999) {
      return await Axios.patch(`${import.meta.env.VITE_API_URL}/user/verify/${userId}`, {
        withCredentials: true,
       }).then((res: AxiosResponse) => res.data); 
    } else {
      return false;
    }
  }
  return (
    <UserContext.Provider value={{
      user,
      login,
      register,
      logout,
      verifyAdmin,
    }}>{props.children}</UserContext.Provider>
  )
}