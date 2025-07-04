import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import PasswordManager from './pages/PasswordManager.jsx'
import VulnerabilityScan from './pages/VulnerabilityScan.jsx'
import HoneyPotMonitor from './pages/HoneyPotMonitor.jsx'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import ProtectedRoute from './component/protectedRoute.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ProtectedRoute><Home /></ProtectedRoute>
      },
      {
        path: '/password-manager',
        element: <ProtectedRoute><PasswordManager /></ProtectedRoute>
      },
      {
        path: '/vulnerability-scan',
        element: <ProtectedRoute><VulnerabilityScan /></ProtectedRoute>
      },
      {
        path: '/honeypot-monitor',
        element: <ProtectedRoute> <HoneyPotMonitor /></ProtectedRoute>
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/settings',
        element: <ProtectedRoute> <Settings /></ProtectedRoute>
      },
      // {
      //   path: 'manager',
      //   element: <Manager />,
      // },

    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <RouterProvider router={router} />
    </ClerkProvider>

  </StrictMode>,
)
