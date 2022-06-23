import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext, UserInfo } from './contexts/AuthContext'
import { emailIsAlreadyRegistered } from './use-cases/authUser/authUserUseCase'
import Routes from './Routes'

const App = () => {
    const [user, setUser] = useState<UserInfo | null>(null)
    const [authLoading, setAuthLoading] = useState<boolean>(true)
    
    useEffect(() => {
        const loadStorageAuth = async () => {
            const sessionUser = sessionStorage.getItem('@AuthFirebase:user')
            if(sessionUser){
                const user = JSON.parse(sessionUser)
                if(await emailIsAlreadyRegistered(user.email))
                    setUser(user)
            }
            setAuthLoading(false)
        }
        loadStorageAuth()
    }, [])

    if(authLoading){
        return (
            <>
                <div className='flex w-screen justify-center items-center h-screen bg-slate-200 opacity-70 z-10'>
                    <div className='rounded-full flex justify-center items-center animate-spin  w-[100px] h-[100px] bg-gradient-to-r from-pink-500 to-yellow-500 z-20'>
                        <div className='rounded-full w-[80px] h-[80px] bg-slate-200 z-20'>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user: user, setUser, authLoading, setAuthLoading }}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </ AuthContext.Provider>
    )
}

export default App

