import { FormEvent, useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LockSimple, Code, GithubLogo, GoogleLogo, Spinner } from 'phosphor-react'
import { AuthContext, UserInfo } from '../../contexts/AuthContext'
import { signInGoogle, signInGithub } from '../../services/firebase'
import { saveUserIntoStorage, authenticateUser } from '../../use-cases/authUser/authUserUseCase'

interface LoginSubmit {
  event: FormEvent,
  authCallback?: () => Promise<{ user: UserInfo | null, token?: string | undefined } | null>,
}

const SignIn = () => {
    const { setUser } = useContext(AuthContext)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleLoginSubmit = async ({ event , authCallback }: LoginSubmit ) => {
      event.preventDefault()
      setLoading(true)
      const sign = await authenticateUser({ email, password }, authCallback) 
      if(sign?.user?.email){
        saveUserIntoStorage({ user:sign.user, token:sign?.token, setUser })
        navigate("/dashboard", { replace: true })
      }
      setLoading(false)
    }

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-400 to-blue-500 h-screen">
        <div className="max-w-md w-full space-y-8 p-6 rounded-xl bg-slate-200 shadow-lg">
          <div>
            <Code className="mx-auto h-20 w-auto rounded-full text-slate-200 p-4 bg-gradient-to-r from-pink-500 to-yellow-500"/>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-2">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email
                </label>
                <input onChange={(e) => setEmail(e.target.value)} value={email} id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-2 focus:ring-offset-2 focus:outline-none focus:ring-pink-500 sm:text-sm" placeholder="Email"/>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Senha
                </label>
                <input onChange={(e) => setPassword(e.target.value)} value={password} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-2 focus:ring-offset-2 focus:outline-none focus:ring-pink-500 sm:text-sm" placeholder="Senha"/>
              </div>
            </div>
            <div>
              <button onClick={(e) => handleLoginSubmit({ event: e })} type="submit" disabled={loading} className='group relative w-full flex justify-center py-3 px-2 text-sm font-medium rounded-md text-white focus:ring-2 focus:ring-offset-2 outline-none focus:ring-pink-500 bg-gradient-to-r from-pink-500 to-yellow-500'>
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockSimple className="h-5 w-5 text-slate-200" aria-hidden="true" />
                </span>
                {
                  loading
                  ? <Spinner size={28} className="animate-spin"/>
                  : <span>Acessar</span>
                }
              </button>
              <button onClick={(e) => handleLoginSubmit({event: e, authCallback:signInGithub })} disabled={loading} className='p-2 mt-2 w-full flex justify-center rounded-lg bg-zinc-700 text-white'>
                <GithubLogo size={28}/>
              </button>
              <button onClick={(e) => handleLoginSubmit({event: e, authCallback:signInGoogle })} disabled={loading} className='p-2 mt-2 w-full flex justify-center rounded-lg bg-red-500 text-white'>
                <GoogleLogo size={28}/>
              </button>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-sm">
                <Link to="/register" className="font-medium text-pink-600 hover:text-pink-500 hover:underline hover:underline-offset-2">
                    Não tem uma conta?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
}

export default SignIn