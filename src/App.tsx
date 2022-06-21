import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext'
import Routes from './Routes'

const App = () => {
    const [user, setUser] = useState<object | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    
    useEffect(() => {
        const loadStorageAuth = () => {
            const userStorage = localStorage.getItem('user')
            if(userStorage){
                setUser(JSON.parse(userStorage))
                setLoading(false)
            }
            setLoading(false)
        }
        
        loadStorageAuth()
    }, [])

    return (
        <AuthContext.Provider value={{ signed: !!user, user: user, loading }}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </ AuthContext.Provider>
    )
}

export default App

