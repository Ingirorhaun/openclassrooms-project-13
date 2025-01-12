import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserProfile } from "./api";
import { setUserProfile } from "./store/features/userSlice";
import { setToken } from "./store/features/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Fetch user profile with the stored token
      const fetchUserProfile = async () => {
        try {
          const userProfile = await getUserProfile(token);
          if (userProfile) {
            dispatch(setUserProfile(userProfile));
            dispatch(setToken(token));
          }
        } catch (error) {
          console.error(error)
          // Delete existing token on error
          dispatch(setToken(null));
          localStorage.removeItem("token");
        }
      };
      fetchUserProfile();
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
