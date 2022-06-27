import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/Auth/AuthProvider'
import { ToastContainer } from 'react-toastify';
import Routes from './Routes'

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <ToastContainer />
                <Routes />
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App

