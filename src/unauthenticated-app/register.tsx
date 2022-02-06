import { useAuth } from 'context/auth-context'
import React, { FormEvent } from 'react'
import { Form, Input, Button } from 'antd'
import { LongButton } from './index'
import { useAsync } from '../utils/useAsync'
const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { register, user } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwError: true })
  const handleSubmit = ({
    cpassword,
    ...values
  }: {
    username: string
    password: string
    cpassword: string
  }) => {
    if (cpassword !== values.password) {
      onError(new Error('两次密码不一致'))
      return
    }
    run(register(values)).catch(onError)
  }
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: '请确认密码!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type="primary" htmlType="submit">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  )
}
export default LoginScreen
