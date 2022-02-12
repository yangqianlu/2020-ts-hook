import {useMemo } from 'react'
import { useSearchParams, URLSearchParamsInit } from 'react-router-dom'
import { cleanObject } from './index';
/**
 * 返回url中参数部分
 * 当对象是react的钩子定义的时候不会造成无限循环 只有显式的调用setState react才会认为状态改变
 * 当对象不是react钩子定义的时候会造成无限循环
 */

export const useQueryParam = <K extends string>(keys: K[]) => { 
  const [searchParams, setSearchParam] = useSearchParams()
  console.log(searchParams,'searchParams')
  return [
   useMemo(()=> keys.reduce((prev, key) => { 
      return {...prev,[key]:searchParams.get(key) || ''}
   }, {} as { [key in K]: string }), [searchParams, keys]), (params: Partial<{ [p in K]: unknown }>) => { 
      const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit
      return setSearchParam(o)
   }
  ] as const
}

