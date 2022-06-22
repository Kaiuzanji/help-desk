import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext'
import Routes from './Routes'

const App = () => {
    const [user, setUser] = useState<object | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    
    useEffect(() => {
        const loadStorageAuth = () => {
            const sessionToken = sessionStorage.getItem('@AuthFirebase:token')
            const sessionUser = sessionStorage.getItem('@AuthFirebase:user')
            if(sessionToken && sessionUser){
                setUser(JSON.parse(sessionUser))
            }
            setLoading(false)
        }
        loadStorageAuth()
    }, [])

    return (
        <AuthContext.Provider value={{ signed: !!user, user: user, setUser, loading, setLoading }}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </ AuthContext.Provider>
    )
}

export default App

