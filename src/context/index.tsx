import { ReactNode } from 'react'
import { AsideMenuProvider } from './menu-context'
import { AuthProvider } from './auth-context'

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <AsideMenuProvider>{children}</AsideMenuProvider>
    </AuthProvider>
  )
}
