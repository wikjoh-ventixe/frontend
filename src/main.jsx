import './main.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Home from './pages/Main/Home.jsx';
import EventDetails from './pages/Main/EventDetails.jsx';
import BookingConfirmation from './pages/Main/BookingConfirmation.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import DashboardHome from './pages/Dashboard/DashboardHome.jsx';
import CenterLayout from './layouts/CenterLayout.jsx';
import Login from './pages/CustomerAuth/Login.jsx';
import Register from './pages/CustomerAuth/Register.jsx';
import DashboardBookings from './pages/Dashboard/DashboardBookings'
import DashboardEvents from './pages/Dashboard/DashboardEvents'
import DashboardLogin from './features/dashboard/login/LoginForm'
import DashboardCustomers from './pages/Dashboard/DashboardCustomers'
import DashboardAdmins from './pages/Dashboard/DashboardAdmins'
import DashboardCreateEvent from './pages/Dashboard/DashboardCreateEvent'
import DashboardEventManagement from './pages/Dashboard/DashboardEventManagement'
import MainpageLayout from './layouts/MainpageLayout.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainpageLayout />,
    children: [
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'event/:id',
        element: <EventDetails />
      },
      {
        path: 'booking-confirmation',
        element: <BookingConfirmation />
      },
      {
        index: true,
        element: <Navigate to="home" replace />
      }
    ]
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
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
        path: 'events/create',
        element: <DashboardCreateEvent />
      },
      {
        path: 'events/:eventId',
        element: <DashboardEventManagement />
      },
      {
        path: 'customers',
        element: <DashboardCustomers />
      },
      {
        path: 'admins',
        element: <DashboardAdmins />
      },
      {
        index: true,
        element: <Navigate to="home" replace />
      }
    ]
  },
  {
    path: '/dashboard/login',
    element: <CenterLayout />,
    children: [
      {
        index: true,
        element: <DashboardLogin />
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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
