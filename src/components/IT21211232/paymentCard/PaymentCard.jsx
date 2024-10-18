import React from 'react'
import { Scale, Calendar, Clock, Edit, MapPin, Info, Rows3, Trash2, Check, X } from "lucide-react"
import { useNavigate } from 'react-router-dom';

export default function PaymentCard({data, version}) {
    const {id, date_time, location, locationName, type, weight, status, collected} = data;
    console.log(data);

    const navigate = useNavigate();

    const dataObj = {
        id: id,
        price: weight*220
    }

    const handleNav = () => {
        navigate('/user/payment/portal', {state: dataObj})
    }
    
  return (
    <div className='bg-white border border-gray-200 rounded-lg shadow-sm p-4 pt-2 w-[80%] my-2 h-auto'>
        <h3 className="text-lg font-[500]">Reference no. <font className='text-gray-400 text-[12px] font-[500]'>{id}</font></h3>
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
        <h1>Rs. {weight * 220}</h1>
        {
            version === 1 &&
            <div className='w-full h-auto flex justify-center'>
                <button
                onClick={handleNav}
                className='w-[90%] text-white bg-primary_yellow rounded-md mx-auto relative h-[30px]'>
                    Pay now
                </button>
            </div>
        }
    </div>
  )
}
