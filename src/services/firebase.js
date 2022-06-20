import { initializeApp, getApp, getApps } from 'firebase/app'
import 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
}
// Initialize Firebase
if(!getApps().length)
    initializeApp(firebaseConfig)

export const getAllApps = () => {
    console.log(getApp())
}
