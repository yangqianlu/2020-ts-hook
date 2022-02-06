import { useEffect } from 'react'
import { useAsync } from './useAsync'
import { User } from 'screen/project-list/search-panel'
import { useHttp } from './http'
import { useMount } from './index';
export const useUser = () => { 
  const { run,...result } = useAsync<User[]>()
  const client = useHttp()
  useMount(() => {
    run(client('users'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })
  return result
}