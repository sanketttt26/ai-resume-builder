import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Api from '../../../../../../../../service/Api.js'
import { Brain, LoaderCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { chatSession } from '../../../../../../../../service/Gemini.js'

const SummaryForm = ({enableNext}) => {
  const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
  const [summery,setSummery]=useState();
  const[loading,setLoading]=useState(false);
  const params=useParams();   
  const { toast } = useToast()
  const prompt= 'Generate a 4-5 lines summery for the job title {jobTitle}.'
  useEffect(()=>{
    summery&&setResumeInfo({
      ...resumeInfo,
      summery:summery
    })
  },[summery])

  const generateSummeryFromAi=async()=>{
    setLoading(true)
    const Prompt= prompt.replace('{jobTitle}',resumeInfo?.jobTitle)
    console.log(Prompt)
    const result= await chatSession.sendMessage(Prompt);
    console.log(result.response.text())
    setLoading(false)
  }
  const onSave=(e)=>{
    e.preventDefault();
      setLoading(true);
      const data={
        data:{
          summery:summery
        }
      }
      Api.UpdateUserResume(params?.resumeId,data).then(res=>{
        console.log(res)
        enableNext(true);
        setLoading(false)
        toast({
          description: "Summery Added",
        })
      },(error)=>{
        setLoading(false)
      })
  }
  return (
    <div>
      <div  className='p-5 shadow-lg border-t-primary border-t-4 mt-10 rounded-xl'>
      <h2 className='font-bold text-lg'>Summery </h2>
        <p>Add Summery for your profile</p>
        <form className='mt-7' onSubmit={onSave}>
          <div className='flex justify-between items-end gap-2'>
            <label htmlFor="">Add Summery</label>
            <Button variant='outline' size='sm' className='border-primary text-primary rounded-[0.5rem] ' type='button'
            onClick={()=>generateSummeryFromAi()}
            > <Brain/>Generate from AI</Button>
          </div>
            <Textarea className='rounded-[0.5rem] mt-5' name='summery' onChange={(e)=>setSummery(e.target.value)} required  placeholder="Add summery here" />
        <div className='mt-2 justify-end flex text-white'>
          <Button type='submit'
              disabled={loading}
              >{loading?<LoaderCircle className='animate-spin'/>:'Save'}</Button>
        </div>
        </form>
        </div>
    </div>
  )
}

export default SummaryForm
