import React, { useState, useRef } from 'react'

// useState
const LazyComState = () => {
  const [callback, setCallback] = useState(() => () => alert('init'))
  return (
    <>
      <button onClick={() => setCallback(() => () => alert('update'))}></button>
      <button onClick={callback}>执行callback</button>
    </>
  )
}

// useRef
const LazyComRef = () => {
  const callbackRef = useRef(() => alert('init'))
  const callback = callbackRef.current
  return (
    <>
      <button
        onClick={() => (callbackRef.current = () => alert('update'))}
      ></button>
      <button onClick={callback}>
        还是老的，因为useRef更新不会让组件更新，callback还是老值
      </button>
      <button onClick={() => callbackRef.current()}>最新的</button>
    </>
  )
}
