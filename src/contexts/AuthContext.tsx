import { createContext } from 'react'
import { UserInfo } from 'firebase/auth'

interface AuthContextType {
    user: UserInfo,
    setUser: (user: UserInfo) => void
    loading: boolean,
    setLoading: (isLoading: boolean) => void
    signed: boolean
}

export const AuthContext = createContext({} as AuthContextType)