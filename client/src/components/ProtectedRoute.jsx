import { PropTypes } from 'prop-types';
import { Navigate } from 'react-router-dom'

export function ProtectedRoute({ children }) {
  // Replace this with your actual authentication check
  const isAuthenticated = false; 
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};