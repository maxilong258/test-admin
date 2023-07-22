import React, { ReactNode, useState } from 'react'

export interface AsideMenu {
  id: number
  name: string
  path: string
  routeName: string
}

const MenuContext = React.createContext<
  {   AsideMenus: AsideMenu[] | null } | undefined
>(undefined)

export const AsideMenuProvider = ({ children }: { children: ReactNode }) => {
  const [AsideMenus] = useState<AsideMenu[]>([
    {
      id: 1,
      name: 'Dashboard',
      path: '/dashboard',
      routeName: 'dashboard'
    },
    {
      id: 2,
      name: 'Users',
      path: '/users',
      routeName: 'users'
    },
    {
      id: 3,
      name: 'Permissions',
      path: '/permissions',
      routeName: 'permissions'
    },
    {
      id: 4,
      name: 'Menus',
      path: '/menus',
      routeName: 'menus'
    }
  ])

  return <MenuContext.Provider children={children} value={{ AsideMenus }} />
}

export const useAsideMenu = () => {
  const context = React.useContext(MenuContext)
  if (!context) throw new Error('useAsideMenu必须在AsideMenuProvider中使用')
  return context
}
