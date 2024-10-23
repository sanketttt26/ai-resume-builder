import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid';
import {useUser} from '@clerk/clerk-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Api from '../../../service/Api.js';
import { useNavigate } from 'react-router-dom';
// import { log } from 'console';


const AddResume = () => {
    const [openDialog,setOpenDialog]=useState(false);
    const [resumeTitle,setResumeTitle] = useState();
    // console.log(resumeTitle);

    const {user}=useUser();
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();

   const onCreate =async () => {
    setLoading(true); // Start loading
    const uuid = uuidv4(); // Generate unique resume ID
    
    // Prepare the data to be sent to the API
    const data = {
        data: {
            resumeTitle: resumeTitle,
            resumeId: uuid,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName
        }
    };

    // Call the API to create a new resume
    Api.CreateNewResume(data)
        .then((res) => {
            if (res && res.data) {
                console.log("Resume created successfully:", res.data.data);
                navigate('/dashboard/resume/'+res.data.data.documentId+'/edit')
            } else {
                console.error("Failed to create resume: No data in response.");
            }
            setLoading(false); // Stop loading
        })
        .catch((error) => {
            console.error("Error creating resume:", error.response?.data || error.message);
            setLoading(false);
        });
};

    return (
        <div className=''>
            <div className='p-14 py-20 lg:py-32 md:py-24 items-center flex justify-center bg-secondary rounded-xl
            lg:h-[280px] hover:scale-105 transition-all hover:shadow-sm hover:cursor-pointer border-dashed' onClick={()=>setOpenDialog(true)}>
                <PlusSquare/>
            </div>
            <Dialog open={openDialog}>
                
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Create new resume</DialogTitle>
                    <DialogDescription>
                     <p> Add title for your new resume</p>
                    <Input className="mt-2 rounded-[0.5rem] mb-2" placeholder="Ex.Full Stack Developer Resume"
                    onChange={(e)=>setResumeTitle(e.target.value)}
                    ></Input> 
                    </DialogDescription>
                    <div className='text-white flex gap-2 justify-end' >
                        <Button variant="ghost" className="text-black border hover:text-primary" onClick={()=>setOpenDialog(false)}>Cancel</Button>
                        <Button
                        disabled={!resumeTitle || loading}
                        onClick={()=>onCreate()}
                        >
                            {
                                loading?
                                <Loader2 className=' animate-spin'/>:"Create"
                            }
                        </Button>
                    </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddResume 
