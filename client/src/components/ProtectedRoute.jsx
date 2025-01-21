import { PropTypes } from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetLogoutFlag } from '../store/features/authSlice';
import { useEffect } from 'react';


export function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated, justLoggedOut } = useSelector((state) => state.auth);

  useEffect(() => {
    // Reset the flag in the useEffect cleanup function, to ensure it's done after the navigation has occurred
    return () => {
        if (justLoggedOut) {
            dispatch(resetLogoutFlag());
        }
    };
  }, [justLoggedOut, dispatch])

  if (!isAuthenticated) {
    if (justLoggedOut) {
      return <Navigate to="/" replace />;
    }
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
