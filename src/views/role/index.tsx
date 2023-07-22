import { useAsync } from '@/utils/use-async'
import { useHttp } from '@/utils/use-http'
import { Button, Popconfirm, Table } from 'antd'
import { useEffect } from 'react'
import { ModifyRoles } from './ModifyRoles'

export const RoleManager = () => {
  const client = useHttp()
  const {
    run: fetchRolesList,
    isLoading: fetchRolesListLoading,
    data: rolesList
  } = useAsync<any>()

  useEffect(() => {
    getRolesData()
  }, [])

  const getRolesData = () => {
    return fetchRolesList(client('roles', {}))
  }

  const tableData = rolesList?.map((role: any) => ({
    key: role.id,
    roles: role.name,
    permissions: role.name
  }))

  const columns = [
    { title: 'Id', dataIndex: 'key', key: 'key' },
    { title: 'Roles', dataIndex: 'roles', key: 'roles' },
    { title: 'Permissions', dataIndex: 'permissions', key: 'permissions' },
    {
      title: 'operate',
      key: 'operate',
      render: (role: any) => (
        <>
          <ModifyRoles type={'modify'} role={role} refetch={getRolesData} />
          <span style={{ margin: '5px' }} />
          <DeleteRoles role={role} refetch={getRolesData} />
        </>
      )
    }
  ]

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <ModifyRoles type={'create'} refetch={getRolesData} />
        {/* <span style={{margin: '5px'}} />
        <FilterUser refetch={getUserData} /> */}
      </div>
      <Table
        loading={fetchRolesListLoading}
        columns={columns}
        dataSource={tableData}
      ></Table>
    </>
  )
}

const DeleteRoles = ({ role, refetch }: any) => {
  const client = useHttp()
  const { run: fetchDeleteRoles, isLoading: isDeleteing } = useAsync()

  const deleteUser = (role: any) => {
    fetchDeleteRoles(client(`roles/${role.key}`, { method: 'DELETE' })).then(
      () => {
        refetch()
      }
    )
  }

  return (
    <>
      <Popconfirm
        title="Delete the task"
        description={`Are you sure to delete Roles ${role.Roles}?`}
        onConfirm={() => deleteUser(role)}
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
