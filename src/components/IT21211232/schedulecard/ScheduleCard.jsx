import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from "react"
import { Scale, Calendar, Clock, Edit, MapPin, Info, Rows3, Trash2, Check, X } from "lucide-react"
import DeleteConfirm from '../deleteConfirmation/DeleteConfirm';

export default function ScheduleCard({data, getUser}) {
    const {id, date_time, location, locationName, type, weight, status, collected} = data;
    
    const [expandUpdate, setExpandUpdate] = useState(false);
    const [expandDelete, setExpandDelete] = useState(false);

    const navigate = useNavigate();

    const updateStates = {
        expandUpdate, setExpandUpdate
    }

    const deleteStates = {
        expandDelete, setExpandDelete
    }

    const handleEdit = () => {
        navigate('/userscheduleupdate', {state: data})
    }

    const handleDelete = () => {
        setExpandDelete(true)
    }
    
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 pt-2 w-[80%] my-2">
        <h3 className="text-lg font-[500]">Reference no. <font className='text-gray-400 text-[12px] font-[500]'>{id}</font></h3>
        <p className='text-red-500 text-[12px] flex items-center mb-3'>
            <Info className="mr-2 h-3 w-3 text-red-500"/>
            If requested provide the above reference number
        </p>
        <p className="text-sm text-gray-600 mb-2 flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-primary_yellow" />
            Location: {locationName}
        </p>
        <p className="text-sm text-gray-600 mb-2 flex items-center">
            <Rows3 className="mr-2 h-4 w-4 text-primary_yellow" />
            Type: {type}
        </p>
        <p className="text-sm text-gray-600 mb-2 flex items-center">
            <Scale className="mr-2 h-4 w-4 text-primary_yellow" />
            Weight: {weight} kg
        </p>
        <p className="text-sm text-gray-600 mb-2 flex items-center">
            <Clock className="mr-2 h-4 w-4 text-primary_yellow" />
            Time: {date_time.toDate().toTimeString().split(' ')[0]}
        </p>
        <p className="text-sm text-gray-600 mb-2 flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-primary_yellow" />
            Date: {date_time.toDate().toISOString().split('T')[0]}
        </p>
        <div className="mt-4 flex space-x-2">
            {
                (!collected && !status) &&
                <button 
                    className="px-4 h-8 text-[12px] border bg-primary_yellow text-white rounded hover:bg-transparent hover:text-primary_yellow hover:border-primary_yellow transition duration-200 flex items-center"
                    onClick={() => handleEdit()}
                >
                    <Edit className="mr-2 h-[14px] w-4" />
                    Edit
                </button>
            }
            {
                (!collected && !status) &&
                <button 
                    className="px-4 h-8 text-[12px] border border-red-400 text-red-400 rounded hover:bg-red-400 hover:text-white transition duration-200 flex items-center"
                    onClick={() => handleDelete()}
                >
                    <Trash2 className="mr-2 h-[14px] w-4" />
                    Delete
                </button>
            }
        
        </div>
        <div className='w-full flex justify-end h-auto mt-2'>

            <div className='flex flex-col items-center mx-2'>
                <div className={`flex items-center content-center p-1 rounded-[50%] border ${status ? 'border-green-400' : 'border-red-400'}`}>
                    {
                        status ?
                        <Check className='text-green-400'/>
                    :
                        <X className='text-red-400'/>
                    }
                </div>
                <p className={`text-[11px] mt-1 ${status ? 'text-green-400' : 'text-red-400'}`}>Scheduled</p>
            </div>

            <div className='flex flex-col items-center mx-2'>
                <div className={`flex items-center content-center p-1 rounded-[50%] border ${collected ? 'border-green-400' : 'border-red-400'}`}>
                    {
                        collected ?
                        <Check className='text-green-400'/>
                    :
                        <X className='text-red-400'/>
                    }
                </div>
                <p className={`text-[11px] mt-1 ${collected ? 'text-green-400' : 'text-red-400'}`}>Collected</p>
            </div>

        </div>
        <DeleteConfirm states={deleteStates} id={id} getUser={getUser}/>
    </div>
  )
}
