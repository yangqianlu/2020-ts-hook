import { useEffect } from 'react'
import { useAsync } from './useAsync'
import { Project } from 'screen/project-list/list'
import { useHttp } from './http'
import { cleanObject } from './index';
export const useProject = (param:Partial<Project>) => { 
  const { run,...result } = useAsync<Project[]>()
  const client = useHttp()
  useEffect(() => {
    run(client('projects', { data: cleanObject(param) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])
  return result
}