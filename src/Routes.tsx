import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ComponentType, useContext } from 'react'
import { AuthContext } from './contexts/AuthContext'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'

const AppRoutes = () => {
    const RouteWrapper = (Component: ComponentType, isPrivate?: boolean) => {
        const { signed, loading } = useContext(AuthContext)
        if(loading){
            return <div>Carregando...</div>
        }
        if(!signed && isPrivate)
            return <Navigate to="/" replace={true} />
        
        if(signed && !isPrivate)
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