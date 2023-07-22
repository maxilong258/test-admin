import { useAsync } from '@/utils/use-async'
import { useHttp } from '@/utils/use-http'
import { Button, Checkbox, Drawer, Form, Input, Radio, Space } from 'antd'
import { useState } from 'react'

interface DrawerProps {
  type: 'create' | 'modify'
  user?: any
  refetch: (queryParams?: object) => Promise<any>
}

export const ModifyUser = (props: DrawerProps) => {
  const { type, user, refetch } = props
  const [isShowModifyDrawer, setIsShowModifyDrawer] = useState(false)
  const [formData, setFormData] = useState<any>(
    type === 'create'
      ? {
          name: '',
          password: '',
          roles: [2],
          gender: 1,
          photo: '',
          address: ''
        }
      : {
          id: user.key,
          name: user.username,
          password: user.password,
          roles: user.roles
            .split(',')
            .map((role: string) =>
              role === '普通用户' ? 2 : role === '管理员' ? 1 : 3
            ),
          gender: user.gender,
          photo: user.photo,
          address: user.address
        }
  )

  const client = useHttp()
  const { run: saveUser, isLoading: isSaveingUser } = useAsync()
  const { run: modifyUser, isLoading: isEditingUser } = useAsync()
  const submit = () => {
    const data = {
      username: formData.name,
      password: formData.password,
      profile: {
        gender: formData.gender,
        photo: formData.photo,
        address: formData.address
      },
      roles: formData.roles
    }
    type === 'create'
      ? saveUser(client('user', { method: 'POST', data })).then(() => {
          setIsShowModifyDrawer(false)
          refetch()
        })
      : modifyUser(
          client(`user/${formData.id}`, { method: 'PATCH', data })
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
        title={`Create User`}
        onClose={() => setIsShowModifyDrawer(false)}
        open={isShowModifyDrawer}
        destroyOnClose={true}
        footer={
          <Space style={{ float: 'right' }}>
            <Button onClick={submit} loading={isSaveingUser || isEditingUser}>
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
          <Form.Item label="Password" name={'password'}>
            <Input
              type={'text'}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Roles" name={'roles'}>
            <Checkbox.Group
              onChange={(checkedValues) => {
                setFormData({
                  ...formData,
                  roles: checkedValues
                })
              }}
            >
              <Checkbox value={1}>管理员</Checkbox>
              <Checkbox value={2}>普通用户</Checkbox>
              <Checkbox value={3}>测试用户</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label="Gender" name={'gender'}>
            <Radio.Group
              onChange={(e) => {
                setFormData({ ...formData, gender: e.target.value })
              }}
            >
              <Radio value={1}>M</Radio>
              <Radio value={2}>F</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Photo" name={'photo'}>
            <Input
              type={'text'}
              onChange={(e) =>
                setFormData({ ...formData, photo: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Address" name={'address'}>
            <Input
              type={'text'}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}
