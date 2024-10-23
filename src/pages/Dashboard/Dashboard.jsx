import React, { useEffect, useState } from 'react'
import AddResume from './AddResume'
import { useUser } from '@clerk/clerk-react'
import Api from '../../../service/Api.js';
import ResumeCard from './ResumeCard';
const Dashboard = () => {
  const {user} = useUser();
  const [resumeList,setResumeList]=useState();
  useEffect(()=>{
    user && getResumeList();
  },[user])
  const getResumeList=()=>{
    Api.GetUserResume(user?.primaryEmailAddress?.emailAddress).then(res=>{
      console.log(res.data.data)
      setResumeList(res.data.data)
    })
  }
  return (
    <div className=' p-10 md:px-20 lg:px-32'>
     <h2 className=' font-bold text-3xl'>My Resume</h2>
     <p>Craft Your Perfect Resume in Minutes with AI Precision!</p>
     <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-10'>
      <AddResume/>
       {
          // Ensure that resumeList is defined and is an array
          resumeList && Array.isArray(resumeList) && resumeList.length > 0 ? (
            resumeList.map((resume, index) => (
              <ResumeCard resume={resume} key={index} />
            ))
          ) : (
            <p>No resumes found</p> // Fallback in case resumeList is empty or not available
          )
        }
     </div>
    </div>
  )
}

export default Dashboard
