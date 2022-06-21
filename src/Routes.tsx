import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import { ComponentType, useEffect, useState } from 'react'

const AppRoutes = () => {
    const loading = false
    const signed = false

    const routeWrapper = (Component: ComponentType, isPrivate?: boolean) => {
        if(loading){
            return <div>Carregando...</div>
        }

        if(!signed && isPrivate)
            return <Navigate to="/?notify=invalidCredentials" replace={true} />
        
        if(signed && !isPrivate)
            return <Navigate to="/dashboard?notify=loginSuccess" replace={true} />

        return <Component />
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={routeWrapper(SignIn)} />
                <Route path='/register' element={routeWrapper(SignUp)} />
                <Route path='/dashboard' element={routeWrapper(Dashboard, true)} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes