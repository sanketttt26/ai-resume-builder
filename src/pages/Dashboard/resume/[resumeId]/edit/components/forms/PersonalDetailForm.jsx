import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import Api from '../../../../../../../../service/Api';
import { LoaderCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
const PersonalDetailForm = ({enableNext}) => {
    // enableNext(false);
    const params=useParams();
    const {resumeInfo,setResumeInfo}= useContext(ResumeInfoContext);
    const [formData,setFormData]=useState();
    const [loading,setLoading]=useState(false);
    const { toast } = useToast()
    useEffect(()=>{
      console.log(params)
    },[])
    const handleChange=(e)=>{
      enableNext(false)
      const {name,value} = e.target; 
      setFormData({
        ...formData,
        [name]:value 
      })
      setResumeInfo({
        ...resumeInfo,
        [name]:value
      })
    }

    
    const onSave=(e)=>{
      e.preventDefault();
      setLoading(true);
      const data={
        data:formData
      }
      Api.UpdateUserResume(params?.resumeId,data).then(res=>{
        console.log(res)
        enableNext(true);
        setLoading(false)
        toast({
          description: "Personal Details Submited",
        })
      },(error)=>{
        setLoading(false)
      })
    }
  return (
    <div  className='p-5 shadow-lg border-t-primary border-t-4 mt-10 rounded-xl'>
      <h2 className='font-bold text-lg'>Personal Detail</h2>
        <p>Get Started with the basic information</p>

        <form onSubmit={onSave}>
          <div className=' grid grid-cols-2 mt-5 gap-3'>
            <div>
              <label htmlFor="">First Name</label>
              <Input type="text" name='firstName' className='rounded-[0.5rem]' onChange={handleChange} required defaultValue={resumeInfo?.firstName}/>
            </div>

            <div>
              <label htmlFor="">Last Name</label>
              <Input type="text" name='lastName' className='rounded-[0.5rem]' onChange={handleChange} required defaultValue={resumeInfo?.lastName}/>
            </div>
            <div className=' col-span-2'>
              <label htmlFor="">Job title</label>
              <Input type="text" name='jobTitle' className='rounded-[0.5rem]' onChange={handleChange} required defaultValue={resumeInfo?.jobTitle}/>
            </div>

             <div className=' col-span-2'>
              <label htmlFor="">Address</label>
              <Input type="text" name='address' className='rounded-[0.5rem]' onChange={handleChange} required defaultValue={resumeInfo?.address}/>
            </div>

             <div>
              <label htmlFor="">Phone</label>
              <Input type="text" name='phone' className='rounded-[0.5rem]' onChange={handleChange} required defaultValue={resumeInfo?.phone}/>
            </div>
             <div>
              <label htmlFor="">Email</label>
              <Input type="text" name='email' className='rounded-[0.5rem]' onChange={handleChange} required defaultValue={resumeInfo?.email}/>
            </div>
          
            <div className=' mt-3 flex justify-end col-span-2 text-white'>
              <Button type='submit'
              disabled={loading}

              >{loading?<LoaderCircle className='animate-spin'/>:'Save'}</Button>
            </div>
          </div>
        </form>
    </div>
  )
}

export default PersonalDetailForm
