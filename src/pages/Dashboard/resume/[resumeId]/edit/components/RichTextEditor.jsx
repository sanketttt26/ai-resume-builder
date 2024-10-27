import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeContext';
import { toast } from '@/hooks/use-toast';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'
import { chatSession } from '../../../../../../../service/Gemini';

const PROMPT='position title: {positionTitle} , Depends on position title give me 3-4 bullet point Generate a list of key accomplishments for the resume. Each accomplishment should be written as a bullet point in HTML <li> tags. '

const RichTextEditor = ({onEditorChange,index}) => {
    const [value,setValue]=useState();
    const{resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
     const [loading,setLoading]=useState(false);
    const GenerateSummeryFromAI=async()=>{
     
      if(!resumeInfo?.experience[index]?.title)
      {
        toast('Please Add Position Title');
        return ;
      }
      setLoading(true)
      const prompt=PROMPT.replace('{positionTitle}',resumeInfo.experience[index].title);
      
      const result=await chatSession .sendMessage(prompt);
      console.log(result.response.text());
      const resp=result.response.text()
    //   setValue(resp.replace('[','').replace(']',''.replace('","','')));
    setValue(resp.replace(/[\[\]"]/g, '').replace(/,/g, ''));


      setLoading(false);
    }
  return (
    <div>
        <div className='flex justify-between my-2'>
        <label className='text-xs'>Summery</label>
        <Button variant="outline" size="sm" 
        onClick={GenerateSummeryFromAI}
        disabled={loading}
        className="flex gap-2 rounded-[0.5rem] border-primary text-primary">
          {loading?
          <LoaderCircle className='animate-spin'/>:  
          <>
           <Brain className='h-4 w-4'/> Generate from AI 
           </>
        }
         </Button>
      </div>
      <EditorProvider>
      <Editor value={value} onChange={(e)=>{
        setValue(e.target.value)
        onEditorChange(e);
      }}>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough/>
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
        </Toolbar>
      </Editor>
    </EditorProvider>
    </div>
  )
}

export default RichTextEditor
