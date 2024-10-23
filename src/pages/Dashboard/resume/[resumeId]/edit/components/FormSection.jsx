import React, { useState } from 'react'
import PersonalDetailForm from './forms/PersonalDetailForm'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import SummeryForm from './forms/SummeryForm'
const FormSection = () => {
  const [activeFormIndex,setActiveFormIndex]=useState(1);
  const [enableNext,setEnableNext]=useState(false);
  return (
    <div>
      <div className='flex gap-2 justify-between items-center'>
        <Button variant='outline' size='sm' className='flex gap-2 rounded-[0.5rem]'><LayoutGrid/>Theme</Button>
        <div className='flex gap-2'>
          {activeFormIndex>1 && <Button className='rounded-[0.5rem] text-white' size='sm' 
          onClick={()=>setActiveFormIndex(activeFormIndex-1)}
          ><ArrowLeft size='sm'/></Button>}
          <Button
          disabled={!enableNext}
          className=' flex gap-2 rounded-[0.5rem] text-white' size='sm'
          onClick={()=>setActiveFormIndex(activeFormIndex+1)}
          >Next <ArrowRight/></Button>
          
        </div>
      </div>
     {/* personal details */}
     {activeFormIndex==1?<PersonalDetailForm enableNext={(val)=>setEnableNext(val)}/>:null}

     {/* summary form */}
     {activeFormIndex==2?<SummeryForm enableNext={(val)=>setEnableNext(val)} />:null}
    </div>
  )
}

export default FormSection
