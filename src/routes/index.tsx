import { DefaultLayout } from '@/layout/default'
import { Dashboard } from '@/views/dashboard'
import { UserManager } from '@/views/user'
import { RoleManager } from '@/views/role'
import { MenuManager } from '@/views/menu'

const routes = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'users', element: <UserManager /> },
      { path: 'permissions', element: <RoleManager /> },
      { path: 'menus', element: <MenuManager /> }
    ]
  }
]

export default routes
