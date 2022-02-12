
import { useEffect, useRef, useState } from "react";

// const isFalse = (val: unknown) => val === false ? false : !val;
const isVoid = (val:unknown) => val === 'undefined' || val === '' || val === 'null'
export const cleanObject = (object: {[key:string]:unknown}) => {
  const result = { ...object };
  Object.entries(result).forEach(([key, value]) => {
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}

// componentDidMount
export const useMount = (callback: () => void) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => callback(), [])
}



//如果组件多次渲染（通常如此），则在执行下一个 effect 之前，上一个 effect 就已被清除
export const useDebounce = <T>(value: T, delay?: number) => {
  const [debounceVal, setDebounceVal] = useState(value);
  useEffect(() => {
    let timer = setTimeout(() => {
      setDebounceVal(value)
    }, delay);
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])
  return debounceVal;
}

// export const useDocumentTitle = (title: string, keepOnUnMount: boolean = true) => { 
//   const oldTitle = document.title;
//   useEffect(() => { 
//     document.title = title
//   }, [title])
  
//   useEffect(() => { 
//     return () => { 
//       if (!keepOnUnMount) { 
//         document.title = oldTitle; 
//       }
//     }
//   },[]) // 利用闭包的特性 oldTitle始终等于初始值
// }

export const useDocumentTitle = (title: string, keepOnUnMount: boolean = true) => { 
  const oldTitle = useRef(document.title).current;
  useEffect(() => { 
    document.title = title
  }, [title])
  
  useEffect(() => { 
    return () => { 
      if (!keepOnUnMount) { 
        document.title = oldTitle;
      }
    }
  },[keepOnUnMount,oldTitle]) 
}

/**
 * 组件挂载的状态 还没挂载或者已经卸载返回false 反之，返回true
 */
export const useMountedRef = () => { 
  const mountedRef = useRef(false);
  useEffect(() => { 
    mountedRef.current = true;
    return () => { 
      mountedRef.current = false;
    }
  })
  return mountedRef;
}



