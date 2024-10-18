import React from 'react'
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../../config/firebase';
import {Info, Trash2, X} from "lucide-react"

export default function DeleteConfirm({states, id, getUser}) {
    const {expandDelete, setExpandDelete} = states;
    console.log(`id is : ${id}`);
    

    const deleteSchedule = async () => {
        try {
            // Reference to the document in the Firestore collection
            const scheduleDocRef = doc(db, "userSchedules", id);
        
            // Delete the document
            await deleteDoc(scheduleDocRef);
            getUser();
            setExpandDelete(false)
        
            console.log(`Schedule with ID: ${scheduleId} deleted successfully.`);
          } catch (error) {
            console.error("Error deleting the schedule: ", error);
          }
    }
  return (
    <div 
    onClick={()=> {
        setExpandDelete(false)
    }}
    className={`fixed flex justify-center items-center top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-40 transition-[1500ms] ${expandDelete ? 'w-screen h-screen' : 'w-0 h-0 opacity-0 pointer-events-none'}  bg-[rgba(0,0,0,0.9)]`}>
      <div 
      onClick={(e)=> {
        e.stopPropagation()
      }}
      className='bg-black h-auto w-[350px] rounded-lg flex flex-col items-center content-center py-5'>
        <div className='flex items-center content-center mb-3'>
            <Info className='text-red-400 h-4 w-4 mr-2'/>
            <p className='text-red-400 text-[13px]'>Do you want to delete this schedule?</p>
        </div>
        <div className='flex mb-4'>
            <button
            onClick={deleteSchedule}
            className='flex items-center justify-center border-[2px] border-[solid] border-red-400 rounded-[50%] h-12 w-12 mr-5'
            >
                <Trash2 className='text-red-400'/>
            </button>
            <button
            onClick={()=> {setExpandDelete(false)}}
            className='flex items-center justify-center border-[2px] border-[solid] border-gray-700 rounded-[50%] h-12 w-12'
            >
                <X className='text-gray-700' />
            </button>
        </div>
      </div>
    </div>
  )
}
