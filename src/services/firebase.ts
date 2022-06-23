import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, GithubAuthProvider } from 'firebase/auth'
import { firebaseConfig } from '../config/settings'
// Your web app's Firebase configuration

export interface SignUser {
    email: string,
    password: string
}

const initialize = () => {
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    return { app, auth }
}

export const signInUser = async ({ email, password }: SignUser) => {
    const { auth } = initialize()
    return await signInWithEmailAndPassword(auth, email, password)
    .then( result => ({ user: result.user, token: "" }))
    .catch( err => {
        console.log(err)
        return null
    })
}

export const signInGoogle = async () => {
    const { auth } = initialize()
    return await signInWithPopup(auth, new GoogleAuthProvider())
    .then( result => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        return { user:result.user, token: credential?.accessToken }
    })
    .catch( error => {
        console.error(error)
        return null
    })
}

export const signInGithub = async () => {
    const { auth } = initialize()     
    return await signInWithPopup(auth, new GithubAuthProvider())
    .then( result => {
        const credential = GithubAuthProvider.credentialFromResult(result)
        return { user: result.user, token: credential?.accessToken }
    })
    .catch( error => {
        console.error(error)
        return null
    })
}