import { Navigate, useLocation } from 'react-router-dom'
import { RouteUrls } from './Router'

const ProtectedRoute = (props: any) => {
  const location = useLocation()

  if (!props.isAuthenticated) {
    return <Navigate to={RouteUrls.signIn} state={{ from: location }} replace />
  }
  return props.children
}

export default ProtectedRoute
