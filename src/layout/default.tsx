import { Col, Menu, MenuProps, Row } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'
import styled from '@emotion/styled'
import { useAsideMenu } from '@/context/menu-context'
import { useAuth } from '@/context/auth-context'
import { UnAuthenticatedApp } from '@/views/unauthenticated'
import { UserPanel } from '@/components/UserPanel'

const useRouteType = () => {
  const units = useLocation().pathname.split('/')
  return units[units.length - 1]
}

export const DefaultLayout = () => {
  const { user } = useAuth()
  const { AsideMenus } = useAsideMenu()
  const routeType = useRouteType()

  const AsideItems: MenuProps['items'] = AsideMenus?.map((menu) => ({
    label: <Link to={menu.path}>{menu.name}</Link>,
    key: menu.routeName
  }))

  return (
    <>
      {!user ? (
        <UnAuthenticatedApp />
      ) : (
        <Row>
          <Col span={4}>
            <Aside>
              <Menu
                mode={'inline'}
                selectedKeys={[routeType]}
                items={AsideItems}
              />
            </Aside>
          </Col>
          <Col span={20}>
            <Header>
              <MainPanel />
              <UserPanel user={user} />
            </Header>
            <Main>
              <Outlet></Outlet>
            </Main>
          </Col>
        </Row>
      )}
    </>
  )
}

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`

const Header = styled.header`
  display: flex;
  height: 44px;
  line-height: 44px;
`
const MainPanel = styled.div`
  flex: 1;
`

const Main = styled.div`
  padding: 10px;
`
