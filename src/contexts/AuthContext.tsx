import { createContext } from 'react'

export type User = {
    email?: string | null,
    name?: string | null
}

type AuthContextType = {
    user: User | null,
    setUser: (user: User) => void
    loading: boolean,
    setLoading: (isLoading: boolean) => void
    signed: boolean
}

export const AuthContext = createContext({} as AuthContextType)