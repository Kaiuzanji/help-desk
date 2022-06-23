import { createContext } from 'react'

export interface UserInfo {
    email: string | null,
    name: string | null,
    phoneNumber: string | null,
    photo: string | null
}

interface AuthContextType {
    user: UserInfo | null,
    setUser: (user: UserInfo) => void
    authLoading: boolean,
    setAuthLoading: (isLoading: boolean) => void
    signed: boolean
}

export const AuthContext = createContext({} as AuthContextType)