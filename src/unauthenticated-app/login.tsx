import { useAuth } from 'context/auth-context'
import React, { FormEvent } from 'react'
import { Form, Input, Button } from 'antd'
import { LongButton } from './index'
import { useAsync } from '../utils/useAsync'
const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { login, user } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwError: true })
  const handleSubmit = (values: { username: string; password: string }) => {
    run(login(values)).catch(onError)
  }
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <LongButton loading={isLoading} type="primary" htmlType="submit">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  )
}
export default LoginScreen
