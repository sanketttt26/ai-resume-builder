import {  Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
const ResumeCard = ({resume}) => {
  return (
    <Link to={'/dashboard/resume/'+resume.documentId+'/edit'}> 
      <div className=' p-14 py-20 lg:py-32 md:py-24 bg-secondary flex items-center justify-center lg:h-[280px] rounded-xl hover:scale-105 transition-all hover:shadow-sm hover:cursor-pointer border border-primary shadow-primary'>
        <Notebook/>
      </div>
      <h2 className='text-center my-1'>{resume.resumeTitle}</h2>
    </Link>
  )
}

export default ResumeCard
