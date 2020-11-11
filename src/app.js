import React from "react"
import { Home, Browse, Signin, Signup } from "./pages"
import { BrowserRouter as Router } from "react-router-dom"
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes"
import { useAuthListener } from "./hooks";
import * as ROUTES from './constants/routes'

export default function App() {
  const { user } = useAuthListener()
  
  return (
    <Router>
      <IsUserRedirect
        user={user}
        loggeedInPath={ROUTES.BROWSE}
        path={ROUTES.SIGN_IN}>
        <Signin />
      </IsUserRedirect>
      <IsUserRedirect
        user={user}
        loggeedInPath={ROUTES.BROWSE}
        path={ROUTES.SIGN_UP}>
        <Signup />
      </IsUserRedirect>
      <ProtectedRoute user={user} path={ROUTES.BROWSE}>
        <Browse />
      </ProtectedRoute>
      <IsUserRedirect user={user} loggeedInPath={ROUTES.BROWSE} path={ROUTES.HOME} exact>
        <Home />
      </IsUserRedirect>
    </Router>
  )
}