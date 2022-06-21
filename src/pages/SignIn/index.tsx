import { LockSimple, Code } from 'phosphor-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const SignIn = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

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
                <input onChange={(e) => setEmail(e.target.value)} value={email} id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm" placeholder="Email"/>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Senha
                </label>
                <input onChange={(e) => setPassword(e.target.value)} value={password} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm" placeholder="Senha"/>
              </div>
            </div>
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-3 px-2 text-sm font-medium rounded-md text-white bg-gradient-to-r from-pink-500 to-yellow-500">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockSimple className="h-5 w-5 text-slate-200" aria-hidden="true" />
                </span>
                Acessar
              </button>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-sm">
                <Link to="/register" className="font-medium text-pink-600 hover:text-pink-500">
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