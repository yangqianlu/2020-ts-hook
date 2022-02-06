// Fetch不会关心AJAX是否成功，他只关心从服务器发送请求和接收响应，如果响应失败我们需要抛出异常。
import { useAuth } from 'context/auth-context'
import qs from 'qs'
import * as auth from '../auth-provider'
const apiUrl = process.env.REACT_APP_API_URL
interface Config extends RequestInit{
  token?: string;
  data?:object
}
// 封装请求 
export const http = (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': data ? 'application/json' : '',
      'Authorization':token? `Bearer ${token}` : "",
    },
    ...customConfig
  }
  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${apiUrl}/${endpoint}`, config)
    .then(async response => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({message:'请重新登录'})
      }
      let data = await response.json();
      if (response.ok) {
        return data;
      } else {
        // 需要手动抛出错误
        return Promise.reject(data)
      }
    })
}
//Parameters<T> 的作用是用于获得函数的参数类型组成的元组类型
// 处理token
export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config,token:user?.token})
}



