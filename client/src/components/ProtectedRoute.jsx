import { PropTypes } from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
