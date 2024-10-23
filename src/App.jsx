import { useState } from 'react'
import './App.css'
import { Navigate, Outlet } from 'react-router-dom'
import {useUser} from '@clerk/clerk-react'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/toaster'
function App() {
  const {user,isLoaded,isSignedIn}=useUser();
  if(!isSignedIn && isLoaded){
    return <Navigate to={'/auth/sign-in'}/>
  }
  return (
    <div>
      <Header/>
      <Outlet/>
      <Toaster/>
    </div>
  )
}

export default App
