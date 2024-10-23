import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import SignInPage from './auth/sign-in/SignIn.jsx'
import EditResume from './pages/Dashboard/resume/[resumeId]/edit/index.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const router= createBrowserRouter(
  [
    {
      element:<App/>,
      children:[
        {
          path:'/dashboard',
          element:<Dashboard/>
        },
        {
          path:'/dashboard/resume/:resumeId/edit',
          element:<EditResume/>
        }
      ]
    },
    {
          path:'/',
          element:<Home/>
    },
    {
      path:'/auth/sign-in',
      element:<SignInPage/>
    },
    
  ]
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <RouterProvider router={router}/>
    </ClerkProvider>
  </StrictMode>,
)
