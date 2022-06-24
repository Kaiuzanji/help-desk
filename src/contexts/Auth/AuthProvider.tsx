import { useState } from 'react'
import { AuthContext, UserInfo, FormLogin } from './AuthContext'
import { createUser, getUserbyEmail, signInUser } from '../../services/firebase'

interface AuthStorage {
    user: UserInfo,
    token?: string | undefined,
}

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [ user, setUser ] = useState<UserInfo | null>(null)
    const [ authLoading, setAuthLoading ] = useState<boolean>(true)

    const saveUserIntoStorage = ({ user, token }: AuthStorage) => {
        setUser(user)
        sessionStorage.setItem('@AuthFirebase:token', token || "")
        sessionStorage.setItem('@AuthFirebase:user', JSON.stringify(user))
    }

    const authenticateUser = async ({ email, password }: FormLogin, authenticate?: () =>  Promise<{ user: UserInfo | null, token?: string | undefined } | null> ) => {
        const sign = (authenticate ? await authenticate() : await signInUser({ email, password }))
        if(sign?.user?.email){
            if(!(await getUserbyEmail(sign.user.email)) && authenticate)
                await createUser({ email: sign.user.email, name: sign.user.name, password: "" })
            return sign
        }
        return
    }

    const signIn = async ({ email, password }: FormLogin, authCallback?: () =>  Promise<{ user: UserInfo | null, token?: string | undefined } | null> ) => {
        const sign = await authenticateUser({ email, password }, authCallback) 
        if(sign?.user?.email){
          saveUserIntoStorage({ user:sign.user, token:sign?.token })
        }
        return !!sign?.user
    }

    const signOut = () => {
        sessionStorage.removeItem('@AuthFirebase:token')
        sessionStorage.removeItem('@AuthFirebase:user')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user: user, setUser, authLoading, setAuthLoading, signIn, signOut }}>
        {children}
        </AuthContext.Provider>
    )
}