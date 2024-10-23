import { ResumeInfoContext } from '@/context/ResumeContext';
import React, { useContext } from 'react'
import PersonalDetailsPreview from './preview/PersonalDetailsPreview';
import Summery from './preview/Summery';
import ProfessionalExperience from './preview/ProfessionalExperience';
import EducationalDetails from './preview/EducationalDetails';
import SkillPreview from './preview/SkillPreview';

const ResumePreview = () => {
const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
  return (
    <div className=' shadow-lg h-full p-14 ' style={{borderColor:resumeInfo?.themeColor}}>
     {/* PERSONAL DERTA */}
     <PersonalDetailsPreview resumeInfo={resumeInfo}/>
     {/* Summary */}
     <Summery resumeInfo={resumeInfo} />
     {/* experince */}
     <ProfessionalExperience resumeInfo={resumeInfo}/>
     {/* educational details */}
     <EducationalDetails resumeInfo={resumeInfo}/>
     {/* SKILLS */}
     <SkillPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview
