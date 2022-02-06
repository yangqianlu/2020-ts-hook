import { useSearchParams } from 'react-router-dom'
/**
 * 返回url中参数部分
 */
export const useQueryParam = (keys: string[]) => { 
  const [searchParams, setSearchParam] = useSearchParams()
  return [
    keys.reduce((prev: {}, next: string) => { 
      return {...prev,[next]:searchParams.get(key)}
    }, {}),setSearchParam
  ]
}