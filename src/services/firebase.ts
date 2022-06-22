import { initializeApp, getApps } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, GithubAuthProvider, AuthCredential, EmailAuthProvider } from 'firebase/auth'
import { firebaseConfig } from '../config/settings'
// Your web app's Firebase configuration

export const signInGoogle = async () => {
    const app = initializeApp(firebaseConfig)
    const provider = new GoogleAuthProvider() 
    const auth = getAuth(app)
    return await signInWithPopup(auth, provider)
    .then( result => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        return { user:result.user, token: token }
    })
    .catch( error => {
        console.error(error)
        return null
    })
}

export const signInUser = async (email: string, password: string) => {
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    return await signInWithEmailAndPassword(auth, email, password)
    .then( result => {
        return { user: result.user }
    })
    .catch( err => {
        console.log(err)
    })
}

export const signInGithub = async () => {
    const app = initializeApp(firebaseConfig)
    const provider = new GithubAuthProvider() 
    const auth = getAuth(app)
    return await signInWithPopup(auth, provider)
    .then( result => {
        const credential = GithubAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        return { user: result.user, token }
    })
    .catch( error => {
        console.error(error)
        return null
    })
}