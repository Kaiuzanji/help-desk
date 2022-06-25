import { createContext } from 'react'

export interface UserInfo {
    email: string | null,
    name: string | null,
    phoneNumber: string | null,
    photo: string | null,
    uid: string
}

export interface FormLogin {
    email: string,
    password: string
}

export interface FormRegister {
    email: string,
    password: string,
    name: string
}

export interface AuthContextType {
    user: UserInfo | null,
    setUser: (user: UserInfo | null) => void,
    authLoading: boolean,
    setAuthLoading: (isLoading: boolean) => void,
    signIn: ({}: FormLogin, authCallback?: () =>  Promise<{ user: UserInfo | null, token?: string | undefined } | null>) => Promise<boolean>,
    signUp: ({}: FormRegister) => Promise<{ invalid: boolean, emailAlreadyRegistered: boolean }>,
    logout: () => void
}

export const AuthContext = createContext({} as AuthContextType)