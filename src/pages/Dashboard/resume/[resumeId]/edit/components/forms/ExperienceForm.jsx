import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeContext';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import RichTextEditor from '../RichTextEditor';


const formField={
    title:'',
    companyName:'',
    city:'',
    state:'',
    startDate:'',
    endDate:'',
    workSummery:'',

}

const ExperienceForm = () => {
    const [experinceList,setExperinceList]=useState([formField]);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const params=useParams();
    const [loading,setLoading]=useState(false);

    // useEffect(()=>{
    //     resumeInfo?.Experience.length>0&&setExperinceList(resumeInfo?.Experience)
        
    // },[])
    const handleChange=(index,event)=>{
       const newEntries=experinceList.slice();
       const{name,value}=event.target;  
       newEntries[index][name]=value;
       setExperinceList(newEntries)
    }
    const AddNewExperience=()=>{
      setExperinceList([...experinceList,formField])
    }
    const RemoveNewExperience=()=>{
      setExperinceList(experinceList=>experinceList.slice(0,-1))
    }

    const handleEditor=(e,name,index)=>{
      const newEntries=experinceList.slice();
      newEntries[index][name]=e.target.value;
      setExperinceList(newEntries)


    }
    
    useEffect(()=>{
      // console.log(experinceList)
      setResumeInfo({
        ...resumeInfo,
        experience:experinceList
      })
    },[experinceList])
  return (
    <div>   
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your previous Job experience</p>
          <div>
            {
              experinceList.map((item,index)=>(
                <div key={index}>
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-[0.5rem]'>
                        <div>
                              <label className='text-xs'>Position Title</label>
                              <Input className='rounded-[0.5rem]' name="title" 
                              onChange={(event)=>handleChange(index,event)}
                              defaultValue={item?.title}
                              />
                          </div>
                          <div>
                              <label className='text-xs'>Company Name</label>
                              <Input className='rounded-[0.5rem]' name="companyName" 
                              onChange={(event)=>handleChange(index,event)}
                              defaultValue={item?.companyName} />
                          </div>
                          <div>
                              <label className='text-xs'>City</label>
                              <Input className='rounded-[0.5rem]' name="city" 
                              onChange={(event)=>handleChange(index,event)} 
                              defaultValue={item?.city}/>
                          </div>
                          <div>
                              <label className='text-xs'>State</label>
                              <Input className='rounded-[0.5rem]' name="state" 
                              onChange={(event)=>handleChange(index,event)}
                              defaultValue={item?.state}
                              />
                          </div>
                          <div>
                              <label className='text-xs'>Start Date</label>
                              <Input className='rounded-[0.5rem]' type="date"  
                              name="startDate" 
                              onChange={(event)=>handleChange(index,event)} 
                              defaultValue={item?.startDate}/>
                          </div>
                          <div>
                              <label className='text-xs'>End Date</label>
                              <Input className='rounded-[0.5rem]' type="date" name="endDate" 
                              onChange={(event)=>handleChange(index,event)} 
                              defaultValue={item?.endDate}
                              />
                          </div>
                          <div className='col-span-2'>
                            {/* Summery */}
                            <RichTextEditor 
                            index={index}
                            onEditorChange={(event)=>handleEditor(event,'workSummery',index)}/>
                          </div>
                          
                    </div>
                </div>
              ))
            }
          </div>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <Button onClick={AddNewExperience} className='text-primary' variant='outline'>+ Add More Experience</Button>
            <Button onClick={RemoveNewExperience} className='text-primary' variant='outline'>- Remove</Button>
          </div>
          <Button className='text-white'>Save</Button>
        </div>
        </div>
    </div>
  )
}

export default ExperienceForm
