import { useState } from 'react'
interface State<D> { 
  stat: 'idle' | 'loading' | 'error' | 'success',
  error: Error | null,
  data:  D | null
}
const defaultInitState:State<null> = {
  stat: 'idle',
  error: null,
  data: null
}

const defaultConfig = {
  throwError:false
}
export const useAsync = <D>(initState?: State<D>,initConfig?:typeof defaultConfig) => { 
  const [state, setState] = useState<State<D>>({
    ...defaultInitState,
    ...initState
  })
  const config = {...defaultConfig, ...initConfig}
  // 处理数据
  const setData = (data:D) => { 
    setState({
      data,
      stat: 'success',
      error: null
    })
  }
  // 处理错误
  const setError = (error:Error) => { 
    setState({
      error,
      stat: "error",
      data:null
    })
  }
  const run = (promise: Promise<D>) => { 
    if (!promise || !promise.then) { 
      throw new Error("需要传入promise");
    }
    // loading
    setState({
      ...state,
      stat: "loading",
    })
    // 调接口
    return promise.then((data) => { 
      setData(data);
      return data
    })
      .catch(error => { 
        setError(error)
        if (config.throwError) return Promise.reject(error)
        return error
      })

  }
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    ...state
  }

}