import { UserInfo } from '../../contexts/AuthContext'
import { signInUser, getUsers, createUser } from '../../services/firebase'

export interface AuthStorage {
    user: UserInfo,
    setUser: (user: UserInfo) => void
    token?: string | undefined,
}

export interface FormUser {
    email: string,
    password: string
}

export const saveUserIntoStorage = ({ user, token, setUser }: AuthStorage) => {
    setUser(user)
    sessionStorage.setItem('@AuthFirebase:token', token || "")
    sessionStorage.setItem('@AuthFirebase:user', JSON.stringify(user))
  }

export const authenticateUser = async ({ email, password }: FormUser, authenticate?: () =>  Promise<{ user: UserInfo | null, token?: string | undefined } | null> ) => {
    const sign = (authenticate ? await authenticate() : await signInUser({ email, password }))
    if(sign?.user?.email){
        if(!(await emailIsAlreadyRegistered(sign.user.email)) && authenticate)
            await createUser({ email: sign.user.email, name: sign.user.name, password: "" })
        return sign
    }
    return
}

export const emailIsAlreadyRegistered = async (email: string) => {
    const user = await getUsers(email)
    return !!user
}