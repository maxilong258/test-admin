import { ReactNode, useEffect } from "react"
import * as auth from '@/utils/auth-provider'
import { useAsync } from "@/utils/use-async"
import { User } from "@/types/user"
import React from "react"
import { http } from "@/utils/use-http"
import { FullPageErrorFallback, FullPageLoading } from "@/components/FullPageLoadingAndError"

interface AuthForm {
  username: string,
  password: string
}

const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()

  if (token) {
    const data = await http('auth/me', {token})
    user = data
  }
  return user 
}

const AuthContext = React.createContext<{
  user: User | null
  register: (form: AuthForm) => Promise<void>
  login: (form: AuthForm) => Promise<void>
  logout: () => Promise<void>
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children}: {children: ReactNode}) => {

  const {data: user, error, isLoading, isIdle, isError, run, setData: setUser} = useAsync<User | null>()

  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => {
    setUser(null)
    // queryClient.clear()
  })


  useEffect(() => {
    run(bootstrapUser())
  }, [])

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  return (
    <AuthContext.Provider children={children} value={{user, login, register, logout}}/>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) throw new Error('useAuth必须在AuthProvider中使用')
  return context
}