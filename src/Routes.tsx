import { Routes, Route, Navigate } from 'react-router-dom'
import { ComponentType, useContext, useEffect } from 'react'
import { getUserbyEmail } from './services/firebase'
import { AuthContext } from './contexts/Auth/AuthContext'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'

const AppRoutes = () => {
    const { authLoading, setAuthLoading, user, setUser } = useContext(AuthContext)
    
    useEffect(() => {
        const loadStorageAuth = async () => {
            const sessionUser = sessionStorage.getItem('@AuthFirebase:user')
            if(sessionUser){
                const user = JSON.parse(sessionUser)
                if(await getUserbyEmail(user.email))
                    setUser(user)
            }
            setAuthLoading(false)
        }
        loadStorageAuth()
    }, [setAuthLoading, setUser])

    const RouteWrapper = (Component: ComponentType, isPrivate?: boolean) => {

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
        
        if(!user && isPrivate)
            return <Navigate to="/" replace={true} />
        
        if(user && !isPrivate)
            return <Navigate to="/dashboard?notify=loginSuccess" replace={true} />

        return <Component />
    }

    return (
        <Routes>
            <Route path='/' element={RouteWrapper(SignIn)} />
            <Route path='/register' element={RouteWrapper(SignUp)} />
            <Route path='/dashboard' element={RouteWrapper(Dashboard, true)} />
        </Routes>
    )
}

export default AppRoutes