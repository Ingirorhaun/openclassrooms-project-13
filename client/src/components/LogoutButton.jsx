import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const LogoutButton = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? (
    <Link to="/logout" className="main-nav-item">
      <i className="fa fa-sign-out"></i>
      Sign Out
    </Link>
  ) : null;
};
