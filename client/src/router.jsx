import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Error } from "./pages/Error";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { store } from "./store/store";
import { logout } from "./store/features/authSlice";
import { clearUserProfile } from "./store/features/userSlice";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        loader: async () => {
          store.dispatch(clearUserProfile());
          store.dispatch(logout());
          return redirect("/");
        },
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
