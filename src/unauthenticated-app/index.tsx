import React, { useState } from 'react'
import LoginScreen from './login'
import RegisterScreen from './register'
import { Card, Divider, Button, Typography } from 'antd'
import styled from '@emotion/styled'
import logo from 'assets/logo.svg'
import { useDocumentTitle } from '../utils/index'

const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  // useDocumentTitle('请登录注册！', false)
  return (
    <Container>
      <Header />
      <ShadowCard>
        <Title>{isRegister ? '请注册' : '请登录'}</Title>
        {error ? (
          <Typography.Text type={'danger'}>{error.message}</Typography.Text>
        ) : null}
        {isRegister ? (
          <RegisterScreen onError={setError} />
        ) : (
          <LoginScreen onError={setError} />
        )}
        <Divider />
        <Button type={'link'} onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? '已经有账号了？直接登录' : '没有账号？去注册'}
        </Button>
      </ShadowCard>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`
const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`
const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgba(94, 108, 132);
`
export const LongButton = styled(Button)`
  width: 100%;
`
export default UnauthenticatedApp
