import React, { useState, useEffect, useMemo } from 'react'
import List from './list'
import SearchPanel from './search-panel'
import { cleanObject, useMount, useDebounce } from '../../utils'
import qs from 'qs'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProject } from 'utils/useProject'
import { useQueryParam } from 'utils/url'
import { useUser } from 'utils/useUser'

const ProjectList = () => {
  const [keys] = useState<('name' | 'personId')[]>(['name', 'personId'])
  const [param, setParam] = useQueryParam(keys)
  console.log(param, 'dddd')

  const projectProject = useMemo(() => {
    return {
      ...param,
      personId: +param.personId || undefined,
    }
  }, [param])
  const debounceVal = useDebounce(projectProject, 2000)

  // 列表
  const { data: list, error, isLoading, retry } = useProject(debounceVal)
  // 用户
  const { data: users } = useUser()
  return (
    <Container>
      <h2>项目列表</h2>
      <SearchPanel
        param={projectProject}
        setParam={setParam}
        users={users || []}
      />
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </Container>
  )
}
const Container = styled.div`
  padding: 3.2rem;
`
export default ProjectList
