import { Button, Popover } from 'antd'
import styled from '@emotion/styled'
import { User } from '@/types/user'
import { useAuth } from '@/context/auth-context'
import { DownOutlined } from '@ant-design/icons'

export const UserPanel = ({ user }: { user: User }) => {
  const { logout } = useAuth()
  const content = (
    <>
      <Button type="link" onClick={() => logout()}>
        Logout
      </Button>
    </>
  )
  return (
    <UserPanelWrapper>
      welcome
      <Popover content={content}>
        <Button type={'link'}>
          {user.username}
          <DownOutlined />
        </Button>
      </Popover>
    </UserPanelWrapper>
  )
}

const UserPanelWrapper = styled.div`
  width: 240px;
  text-align: right;
`
