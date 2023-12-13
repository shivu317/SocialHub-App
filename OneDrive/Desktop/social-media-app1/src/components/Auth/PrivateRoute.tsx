// components/Auth/PrivateRoute.tsx

import React from 'react'
import { Route, RouteProps, Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

interface PrivateRouteProps {}

const PrivateRoute: React.FC<RouteProps & PrivateRouteProps> = ({ ...props }) => {
  const authContext = useAuth()

  if (!authContext.isAuthenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" />
  }

  // If authenticated, render the Route with its props
  return <Route {...props} />
}

export default PrivateRoute
