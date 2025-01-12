import ArgentBankLogo from "../assets/images/argentBankLogo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/features/authSlice';
import { clearUserProfile } from "../store/features/userSlice";

export const Header = () => {
  const user = useSelector((state) => state.user);

  const LogoutButton = () => {
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

  return (
    <header>
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={ArgentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          {user.firstName ? (
            <Link to="/profile" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {user.firstName}
            </Link>
          ) : (
            <Link to="/login" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          )}
          <LogoutButton/>
        </div>
      </nav>
    </header>
  );
};
