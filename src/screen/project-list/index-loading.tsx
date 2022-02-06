import React, { useState, useEffect } from 'react'
import List from './list'
import SearchPanel from './search-panel'
import { cleanObject, useMount, useDebounce } from '../../utils'
import qs from 'qs'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'
import { Typography } from 'antd'
const apiUrl = process.env.REACT_APP_API_URL

const ProjectList = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<null | Error>(null)
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  const debounceVal = useDebounce(param, 2000)
  const client = useHttp()
  useEffect(() => {
    setLoading(true)
    setError(null)
    client('projects', { data: cleanObject(debounceVal) })
      .then(setList)
      .catch((error) => {
        setList([])
        setError(error)
      })
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceVal])
  useMount(() => {
    client('users').then(setUsers)
  })
  return (
    <Container>
      <h2>项目列表</h2>
      <SearchPanel param={param} setParam={setParam} users={users} />
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list} users={users} />
    </Container>
  )
}
const Container = styled.div`
  padding: 3.2rem;
`
export default ProjectList
