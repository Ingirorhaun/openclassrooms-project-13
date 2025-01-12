import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  setToken,
  loginFailure,
} from "../store/features/authSlice";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../api.js";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogin = async (credentials) => {
    try {
      dispatch(loginStart());
      const data = await userLogin(credentials);
      if (data.token) {
        dispatch(setToken(data.token));
        navigate("/profile");
      } else {
        dispatch(loginFailure("Invalid credentials"));
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    handleLogin({ email: username, password: password });
  };

  // navigate to profile page if the user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            className="sign-in-button"
            onClick={handleLogin}
            disabled={loading}
          >
            Sign In
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </section>
    </main>
  );
};
