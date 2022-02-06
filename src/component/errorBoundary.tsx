import React, {
  PropsWithChildren,
  Component,
  ReactElement,
  ReactNode,
} from 'react'
// https://github.com/bvaughn/react-error-boundary
type FallbackRender = (props: { error: Error | null }) => ReactElement

// PropsWithChildren < { fallbackRender: FallbackRender } > 等价于 { children:ReactNode,fallbackRender: FallbackRender}
export class ErrorBoundary extends Component<
  PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null }

  // 当子组件抛出异常，这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { fallbackRender, children } = this.props
    if (error) {
      return fallbackRender({ error })
    }
    return children
  }
}
