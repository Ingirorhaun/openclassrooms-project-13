import ArgentBankLogo from "../assets/images/argentBankLogo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LogoutButton } from "./LogoutButton";

export const Header = () => {
  const user = useSelector((state) => state.user);

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
