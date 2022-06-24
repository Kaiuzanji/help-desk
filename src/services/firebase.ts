import { initializeApp } from 'firebase/app'
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, GithubAuthProvider, UserInfo, createUserWithEmailAndPassword } from 'firebase/auth'
import { firebaseConfig } from '../config/settings'
// Your web app's Firebase configuration

export interface SignUser {
    email: string,
    password: string
}

export interface UserProfile {
    email: string,
    name: string | null,
    password: string
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const treatResultSign = (user: UserInfo) => {
    return {
        email: user.email,
        name: user.displayName,
        phoneNumber: user.phoneNumber,
        photo: user.photoURL,
        uid: user.uid
    }
}

export const signInUser = async ({ email, password }: SignUser) => {
    return await signInWithEmailAndPassword(auth, email, password)
    .then( result => ({ user: treatResultSign(result.user), token: "" }))
    .catch( err => {
        console.log(err)
        return null
    })
}

export const signInGoogle = async () => {
    return await signInWithPopup(auth, new GoogleAuthProvider())
    .then( result => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        return { user: treatResultSign(result.user), token: credential?.accessToken }
    })
    .catch( error => {
        console.error(error)
        return null
    })
}

export const signInGithub = async () => {
    return await signInWithPopup(auth, new GithubAuthProvider())
    .then( result => {
        const credential = GithubAuthProvider.credentialFromResult(result)
        return { user: treatResultSign(result.user), token: credential?.accessToken }
    })
    .catch( error => {
        console.error(error)
        return null
    })
}

export const createUser = async (user: UserProfile) => {
    const db = getFirestore(app)
    const userCollection = collection(db, "users")
    await addDoc(userCollection, user)
    return await createUserWithEmailAndPassword(auth, user.email, user.password)
    .then( result => treatResultSign(result.user))
    .catch( error => {
        console.error(error)
        return null
    })
}

export const getUsers = async () => {
    const db = getFirestore(app)
    const userCollection = collection(db, "users")
    const queryUsers = await getDocs(userCollection)
    return queryUsers.docs.map( doc => doc.data())
}

export const getUserbyEmail = async (email: string) => {
    const db = getFirestore(app)
    const userCollection = collection(db, "users")
    const queryUsers = query(userCollection, where("email", "==", email))
    const userDocs = await getDocs(queryUsers) 
    return userDocs.docs.map( doc => doc.data())[0]
}