import { useNavigate } from 'react-router-dom';
import { logout } from '../store/features/authSlice';
import { clearUserProfile } from "../store/features/userSlice";
import { useDispatch, useSelector } from 'react-redux';

export const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleLogout = async () => {
      await Promise.all([
        dispatch(clearUserProfile()),
        dispatch(logout())
      ]);
      navigate("/");
    };

    return isAuthenticated ? (
      <button className="logout-button main-nav-item" onClick={handleLogout}>
        <i className="fa fa-sign-out"></i>
        Sign Out
      </button>
    ) : null;
  };