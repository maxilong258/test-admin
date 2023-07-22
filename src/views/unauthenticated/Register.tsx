import { Button, Card, Form, Input } from 'antd'
import { Container } from '@/components/LoginFormContainer'
import { useAuth } from '@/context/auth-context'

export const Register = ({
  setIsRegister
}: {
  setIsRegister: (type: boolean) => void
}) => {
  const { register } = useAuth()
  const submit = (value: any) => {
    const { username, password } = value
    register({ username, password }).catch((error) => console.log(error))
  }

  const rules = {
    username: [{ required: true, message: '请输入用户名' }],
    password: [{ required: true, message: '请输入密码' }],
    confirmPassword: [
      { required: true, message: '请再次输入密码' },
      ({ getFieldValue }: any) => ({
        validator(_: any, value: any) {
          if (!value || getFieldValue('password') === value)
            return Promise.resolve()
          return Promise.reject(
            new Error('The new password that you entered do not match!')
          )
        }
      })
    ]
  }

  return (
    <Container>
      <Card title={'注册'}>
        <Form onFinish={submit}>
          <Form.Item name={'username'} rules={rules.username}>
            <Input placeholder={'用户名'} type={'test'} id={'username'} />
          </Form.Item>
          <Form.Item name={'password'} rules={rules.password}>
            <Input placeholder={'密码'} type={'test'} id={'password'} />
          </Form.Item>
          <Form.Item name={'confirmPassword'} rules={rules.confirmPassword}>
            <Input
              placeholder={'确认密码'}
              type={'test'}
              id={'confirmPassword'}
            />
          </Form.Item>
          <Form.Item>
            <Button block htmlType={'submit'} type={'primary'}>
              注册
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              block
              type={'primary'}
              onClick={() => setIsRegister(false)}
            >
              已有账号？去登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Container>
  )
}
