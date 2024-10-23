import React from 'react'
import logo from '../../assets/logo.svg'
import { Link, Navigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"

import {useUser,UserButton} from "@clerk/clerk-react"
const Header = () => {
    const {user,isSignedIn}=useUser();
  return (
    <div className=' px-3 py-5 flex justify-between shadow-md text-white'>
        <img src={logo} alt='logo'/>
        {
            isSignedIn?
            <div className='flex items-center gap-2 text-black'>
                <Link to={'/dashboard'}><Button variant='outline'>Dashboard</Button></Link>
                <UserButton/>
            </div>
            :
            <Link to={'/auth/sign-in'}><Button>Get Started</Button></Link>  
        }
    
    </div>
  )
}

export default Header
