import React from 'react'
import UnauthenticatedApp from 'unauthenticated-app'
import AuthenticatedApp from 'authenticated-app'
import './App.css'
import { useAuth } from 'context/auth-context'
import { ErrorBoundary } from './component/errorBoundary'
import { FullPageErrorFallback } from './component/lib'
import { ReactNode } from 'react'

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user?.name ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  )
}

export default App
