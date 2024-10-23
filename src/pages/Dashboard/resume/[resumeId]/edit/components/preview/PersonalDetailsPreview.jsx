import React from 'react'

const PersonalDetailsPreview = ({resumeInfo}) => {
    const title=resumeInfo?.jobTitle;
    // if(title){

    //   const captilaized=title[0].toUpperCase()+title.substring(1);
    // }
  return (
    <div>
      <h2 className=' font-bold text-xl text-center' style={{color:resumeInfo?.themeColor}}>{resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
      <h2 className='text-sm text-center font-medium' >{resumeInfo?.jobTitle}</h2>
      <h2 className='text-xs text-center font-medium' style={{color:resumeInfo?.themeColor}} >{resumeInfo?.address}</h2>
      <div className='flex justify-between'>
        <h2 className='font-normal text-xs' style={{color:resumeInfo?.themeColor}}>{resumeInfo?.phone}</h2>
        <h2 className='font-normal text-xs' style={{color:resumeInfo?.themeColor}}>{resumeInfo?.email}</h2>
      </div>
      <hr className='border-[1.5px] my-2'
        style={{
            borderColor:resumeInfo?.themeColor
        }}
        />
    </div>
  )
}

export default PersonalDetailsPreview
