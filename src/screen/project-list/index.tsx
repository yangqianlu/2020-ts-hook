import React, { useState, useEffect } from 'react'
import List from './list'
import SearchPanel from './search-panel'
import { cleanObject, useMount, useDebounce } from '../../utils'
import qs from 'qs'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProject } from 'utils/useProject'
import { useUser } from 'utils/useUser'

const ProjectList = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const debounceVal = useDebounce(param, 2000)
  // 列表
  const { data: list, error, isLoading } = useProject(debounceVal)
  // 用户
  const { data: users } = useUser()
  return (
    <Container>
      <h2>项目列表</h2>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  )
}
const Container = styled.div`
  padding: 3.2rem;
`
export default ProjectList
