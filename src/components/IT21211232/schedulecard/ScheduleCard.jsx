import React from 'react'
import { useState, useContext, useEffect } from "react"
import { Scale, Calendar, Clock, Edit, MapPin, Rows3, Trash2 } from "lucide-react"

export default function ScheduleCard({data}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 w-[80%] my-2">
        <h3 className="text-xl font-bold mb-2">Apple</h3>
        <p className="text-sm text-gray-600 mb-2 flex items-center">
        <MapPin className="mr-2 h-4 w-4 text-primary_yellow" />
        Location: 2023-05-20
        </p>
        <p className="text-sm text-gray-600 mb-2 flex items-center">
        <Rows3 className="mr-2 h-4 w-4 text-primary_yellow" />
        Type: 2023-05-20
        </p>
        <p className="text-sm text-gray-600 mb-2 flex items-center">
        <Scale className="mr-2 h-4 w-4 text-primary_yellow" />
        Weight: 0.5 kg
        </p>
        <p className="text-sm text-gray-600 mb-2 flex items-center">
        <Clock className="mr-2 h-4 w-4 text-primary_yellow" />
        Time: 10:00
        </p>
        <p className="text-sm text-gray-600 mb-2 flex items-center">
        <Calendar className="mr-2 h-4 w-4 text-primary_yellow" />
        Date: 2023-05-20
        </p>
        <div className="mt-4 flex space-x-2">
        <button 
            className="px-4 h-8 text-[12px] border bg-primary_yellow text-white rounded hover:bg-transparent hover:text-primary_yellow hover:border-primary_yellow transition duration-200 flex items-center"
            onClick={() => handleEdit('1')}
        >
            <Edit className="mr-2 h-[14px] w-4" />
            Edit
        </button>
        <button 
            className="px-4 h-8 text-[12px] border border-red-500 text-red-500 rounded hover:bg-red-600 hover:text-white transition duration-200 flex items-center"
            onClick={() => handleDelete('1')}
        >
            <Trash2 className="mr-2 h-[14px] w-4" />
            Delete
        </button>
        </div>
    </div>
  )
}
