import { Card, Form, Input, Checkbox, Button } from 'antd'

import { Container } from '@/components/LoginFormContainer'
import { useAuth } from '@/context/auth-context'

export const Login = ({
  setIsRegister
}: {
  setIsRegister: (type: boolean) => void
}) => {
  const { login } = useAuth()

  const submit = (values: {
    username: string
    password: string
    remember: any
  }) => {
    const { username, password } = values
    login({ username, password })
  }

  const rules = {
    username: [{ required: true, message: '请输入用户名' }],
    password: [{ required: true, message: '请输入密码' }]
  }

  return (
    <Container>
      <Card title={'登录'}>
        <Form onFinish={submit}>
          <Form.Item name={'username'} rules={rules.username}>
            <Input placeholder={'用户名'} type={'test'} id={'username'} />
          </Form.Item>
          <Form.Item name={'password'} rules={rules.password}>
            <Input placeholder={'密码'} type={'test'} id={'password'} />
          </Form.Item>
          <Form.Item
            name={'remember'}
            valuePropName="checked"
            initialValue={false}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button loading={false} htmlType={'submit'} type={'primary'} block>
              登录
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              block
              loading={false}
              type={'primary'}
              onClick={() => setIsRegister(true)}
            >
              去注册
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Container>
  )
}
