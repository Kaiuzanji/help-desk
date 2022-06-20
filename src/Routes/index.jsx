import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

const RoutesApp = () => {
    const signed = true

    const verifyAuth = (isPrivate, Component) => {
        if(!signed || isPrivate)
            return <Navigate to="/" replace />
            
        if(signed || !isPrivate)
            return <Navigate to="/dashboard" replace />
        
        return <Component />
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/register" element={verifyAuth(false, SignUp)} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp
