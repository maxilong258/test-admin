import { useAsync } from '@/utils/use-async'
import { useHttp } from '@/utils/use-http'
import { Button, Drawer, Form, Input, Space } from 'antd'
import { useState } from 'react'

interface DrawerProps {
  type: 'create' | 'modify'
  role?: any
  refetch: (queryParams?: object) => Promise<any>
}

export const ModifyRoles = (props: DrawerProps) => {
  const { type, role, refetch } = props

  const [isShowModifyDrawer, setIsShowModifyDrawer] = useState(false)
  const [formData, setFormData] = useState<any>(
    type === 'create'
      ? {
          name: ''
        }
      : {
          id: role.key,
          name: role.roles
        }
  )

  const client = useHttp()
  const { run: saveRoles, isLoading: isSaveingRoles } = useAsync()
  const { run: modifyRoles, isLoading: isEditingRoles } = useAsync()
  const submit = () => {
    const data = {
      name: formData.name
    }
    type === 'create'
      ? saveRoles(client('roles', { method: 'POST', data })).then(() => {
          setIsShowModifyDrawer(false)
          refetch()
        })
      : modifyRoles(
          client(`roles/${formData.id}`, { method: 'PATCH', data })
        ).then(() => {
          setIsShowModifyDrawer(false)
          refetch()
        })
  }
  return (
    <>
      <Button onClick={() => setIsShowModifyDrawer(true)}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Button>

      <Drawer
        width={600}
        title={`Create Roles`}
        onClose={() => setIsShowModifyDrawer(false)}
        open={isShowModifyDrawer}
        destroyOnClose={true}
        footer={
          <Space style={{ float: 'right' }}>
            <Button onClick={submit} loading={isSaveingRoles || isEditingRoles}>
              Save
            </Button>
          </Space>
        }
      >
        <Form layout={'vertical'} initialValues={formData}>
          <Form.Item label="Name" name={'name'}>
            <Input
              type={'text'}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}
