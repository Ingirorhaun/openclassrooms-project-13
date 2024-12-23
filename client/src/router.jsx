// src/router.jsx
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { Error } from './pages/Error'
import { ProtectedRoute } from './components/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'profile',
        element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
      },
    ],
  },
])