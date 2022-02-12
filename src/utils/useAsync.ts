import { useState, useRef, useCallback } from 'react';
import { useMountedRef } from './index'
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
export const useAsync = <D>(initState?: State<D>, initConfig?: typeof defaultConfig) => { 
  const mountedRef = useMountedRef();
  const [retry, setRetry] = useState(()=>() => { })
  const [state, setState] = useState<State<D>>({
    ...defaultInitState,
    ...initState
  })
  const config = {...defaultConfig, ...initConfig}
  // 处理数据
  const setData = useCallback((data:D) => { 
    setState({
      data,
      stat: 'success',
      error: null
    })
  },[])
  // 处理错误
  const setError = useCallback((error:Error) => { 
    setState({
      error,
      stat: "error",
      data:null
    })
  },[])
  const run = useCallback((promise: Promise<D>, runConfig?: {retry:()=>Promise<D>}) => { 
    if (!promise || !promise.then) { 
      throw new Error("需要传入promise");
    }
    // 保存函数 方便重新调接口
    setRetry(() => () => { 
      if (runConfig?.retry) { 
        run(runConfig?.retry(),runConfig)
      }
      
    })
    // loading
    setState(prevState => ({ 
      ...prevState,
      stat: "loading",
    }))
    // 调接口
    return promise.then((data) => { 
      if(mountedRef.current) // 组件卸载就不在执行setData 防止报错
      setData(data);
      return data
    })
      .catch(error => { 
        setError(error)
        if (config.throwError) return Promise.reject(error)
        return error
      })

  },[config.throwError, mountedRef, setData, setError])
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    retry,
    ...state
  }

}