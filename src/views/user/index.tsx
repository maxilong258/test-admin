import { User } from '@/types/user'
import { useAsync } from '@/utils/use-async'
import { useHttp } from '@/utils/use-http'
import { Button, Popconfirm, Table } from 'antd'
import { useEffect } from 'react'
import { ModifyUser } from './ModifyUser'
import { FilterUser } from './FilterUser'

export const UserManager = () => {
  const client = useHttp()
  const {
    run: fetchUserList,
    isLoading: fetchUserListLoading,
    data: userList
  } = useAsync<User[]>()

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = (queryParams?: object) => {
    return fetchUserList(client('user', {data: queryParams}))
  }

  const TableData = userList?.map((user) => ({
    key: user.id,
    username: user.username,
    password: user.password,
    roles: user.roles.map((role: any) => role.name).join(','),
    gender: user.profile?.gender,
    photo: user.profile?.photo,
    address: user.profile?.address
  }))

  const columns = [
    { title: 'Id', dataIndex: 'key', key: 'key' },
    { title: 'Name', dataIndex: 'username', key: 'username' },
    { title: 'Roles', dataIndex: 'roles', key: 'roles' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    { title: 'Photo', dataIndex: 'photo', key: 'photo' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'operate',
      key: 'operate',
      render: (user: any) => (
        <>
          <ModifyUser
            type={'modify'}
            user={user}
            refetch={getUserData}
          ></ModifyUser>
          <span style={{margin: '5px'}} />
          <DeleteUser user={user} refetch={getUserData} />
        </>
      )
    }
  ]

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <ModifyUser type={'create'} refetch={getUserData} />
        <span style={{margin: '5px'}} />
        <FilterUser refetch={getUserData} />
      </div>
      <Table
        loading={fetchUserListLoading}
        columns={columns}
        dataSource={TableData}
      ></Table>
    </>
  )
}

const DeleteUser = ({ user, refetch }: any) => {
  const client = useHttp()
  const { run: fetchDeleteUser, isLoading: isDeleteing } = useAsync()

  const deleteUser = (user: any) => {
    fetchDeleteUser(client(`user/${user.key}`, { method: 'DELETE' })).then(
      () => {
        refetch()
      }
    )
  }

  return (
    <>
      <Popconfirm
        title="Delete the task"
        description={`Are you sure to delete user ${user.username}?`}
        onConfirm={() => deleteUser(user)}
        okText="Yes"
        cancelText="No"
      >
        <Button danger loading={isDeleteing}>
          Delete
        </Button>
      </Popconfirm>
    </>
  )
}
