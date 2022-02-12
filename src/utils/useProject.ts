import { useCallback, useEffect } from 'react'
import { useAsync } from './useAsync'
import { Project } from 'screen/project-list/list'
import { useHttp } from './http'
import { cleanObject } from './index';
export const useProject = (param:Partial<Project>) => { 
  const { run,...result } = useAsync<Project[]>()
  const client = useHttp()
  const refreshHttp = useCallback(() => client('projects', { data: cleanObject(param) }),[param, client])
  useEffect(() => {
    run(refreshHttp(), {retry:refreshHttp})
  }, [param,refreshHttp,run])
  return result
}


export const useEditProject = () => { 
  const client = useHttp()
  const { run, ...result } = useAsync()
  const mutate = (param: Partial<Project>) => { 
    console.log(param,'000')
    return run(client(`projects/${param.id}`, { data: param, method:'PATCH' }))
  }
  return {
    mutate,
    ...result
  }
}

