import React from 'react'

const Summery = ({resumeInfo}) => {
  return (
   
       <p className='text-xs'>
        {resumeInfo?.summery}
    </p>
    
  )
}

export default Summery
