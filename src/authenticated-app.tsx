import styled from '@emotion/styled'
import { useAuth } from 'context/auth-context'
import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Menu, Dropdown, Button } from 'antd'
import ProjectList from './screen/project-list'
import ProjectModel from './screen/project-list/project-model'
import ProjectScreen from './screen/project'
import { Row } from './component/lib'
import { useDocumentTitle } from './utils'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Navigate, Routes, Route } from 'react-router'
import ProjectPopover from '../src/component/project-popover'

const AuthenticatedApp = () => {
  const { logout, user } = useAuth()
  useDocumentTitle('项目列表', false)
  const [projectModelOpen, setProjectModelOpen] = useState(false)
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width={'18rem'} color={'rgba(38,132,255)'} />
          <ProjectPopover />
          <span>用户</span>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="logout">
                  <Button type={'link'} onClick={logout}>
                    登出
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button type={'link'} onClick={(e) => e.preventDefault()}>
              hi, {user?.name}
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <BrowserRouter>
          <Routes>
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
          </Routes>
        </BrowserRouter>
      </Main>
      <ProjectModel
        projectModelOpen={projectModelOpen}
        onClose={() => setProjectModelOpen(false)}
      />
    </Container>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem calc(100vh - 6rem);
  height: 100vh;
`
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``

const Main = styled.div``

export default AuthenticatedApp
