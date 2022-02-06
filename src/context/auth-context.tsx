import React, { ReactNode, useContext, useState } from 'react'
import { useMount } from 'utils'
import * as auth from '../auth-provider'
import { User } from '../screen/project-list/search-panel'
import { http } from '../utils/http'
import { useAsync } from '../utils/useAsync'
import { FullPageLoading, FullPageErrorFallback } from '../component/lib'

interface AuthForm {
  username: string
  password: string
}
const AuthContext = React.createContext<
  | {
      user: User | null
      login: (form: AuthForm) => Promise<void>
      register: (form: AuthForm) => Promise<void>
      logout: () => Promise<void>
    }
  | undefined
>(undefined)
AuthContext.displayName = 'AuthContext'

// 初始化 刷新之后保存用户信息
export const bootstrapUser = async () => {
  const token = auth.getToken()
  if (token) {
    let data = await http('me', { token })
    return data.user
  } else {
    return null
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null)
  const {
    run,
    isLoading,
    isIdle,
    setData: setUser,
    isError,
    error,
    data: user,
  } = useAsync<User | null>()
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))
  useMount(async () => {
    // setUser(await bootstrapUser())
    setUser(await run(bootstrapUser()))
  })
  if (isIdle || isLoading) {
    return <FullPageLoading />
  }
  if (isError) {
    return <FullPageErrorFallback error={error} />
  }
  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
