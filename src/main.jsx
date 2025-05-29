import './main.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomeLayout from './layouts/HomeLayout.jsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import DashboardHome from './pages/Dashboard/DashboardHome.jsx';
import CenterLayout from './layouts/CenterLayout.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import DashboardBookings from './pages/Dashboard/DashboardBookings'
import DashboardEvents from './pages/Dashboard/DashboardEvents'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: 'home',
        element: <DashboardHome />
      },
      {
        path: 'bookings',
        element: <DashboardBookings />
      },
      {
        path: 'events',
        element: <DashboardEvents />
      },
      {
        index: true,
        element: <Navigate to="home" replace />
      }
    ]
  },
  {
    path: '/auth',
    element: <CenterLayout />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        index: true,
        element: <Navigate to="login" replace />
      }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
