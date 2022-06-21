import { createContext } from 'react'

type AuthContextType = {
    user: object | null,
    signed: boolean,
    loading: boolean
}

export const AuthContext = createContext({} as AuthContextType)