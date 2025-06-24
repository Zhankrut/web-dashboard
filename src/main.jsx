import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import PasswordManager from './pages/PasswordManager.jsx'
import VulnerabilityScan from './pages/VulnerabilityScan.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        index: true,
        element: <Home/>
      },
      {
        path:'/password-manager',
        element:<PasswordManager/>
      },
      {
        path:'/vulnerability-scan',
        element:<VulnerabilityScan/>
      }
      
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
