import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import { collection, doc, updateDoc, getDocs, addDoc, Timestamp, GeoPoint } from "firebase/firestore" // imported from the firestore
import { GlobalDataContext } from '../../../context/globalData';
import { Scale, Calendar, Clock, Edit, Trash2 } from "lucide-react"

import { db } from '../../../config/firebase';

export default function UpdateSchedule() {
    const {currentPage, setCurrentPageData} = useContext(GlobalDataContext)
    const locationHook = useLocation();
    const {id, date_time, location, locationName, type, weight} = locationHook.state;

    const navigate = useNavigate();

    let jsDate;
    let firebaseTimestamp;

    if(date_time && date_time.seconds){
        firebaseTimestamp = new Timestamp(date_time.seconds, date_time.nanoseconds);
    }

    const [selectedField, setSelectedField] = useState(null)
    const [locationS, setLocation] = useState(location); // The capital s stands for state and is used to distinguish in between a variable and a state.
    const [locationNameS, setLocationName] = useState(locationName);
    const [wasteTypeS, setWasteType] = useState(type)
    const [weightS, setWeight] = useState(weight)
    const [time, setTime] = useState(firebaseTimestamp.toDate().toTimeString().split(' ')[0])
    const [date, setDate] = useState(firebaseTimestamp.toDate().toISOString().split('T')[0])

    const usersSchedulesRef = collection(db, "userSchedules")
    
    const updateUserSchedules = async() => {
        try {
            // combning the date and time into a single string
            const dateTimeStr = `${date}T${time}:00`;
            const combinedDateTime = new Date(dateTimeStr);
    
            // creating a firestore timestamp
            const firestoretimestamp = Timestamp.fromDate(combinedDateTime)
    
            const updatedData = {
                date_time: firestoretimestamp, // Firestore Timestamp
                location: new GeoPoint(45, 76), // GeoPoint
                locationName: "Colombo, Sri Lanka", // String
                type: wasteTypeS, // String
                userId: "tr53hy7e83n83", // String
                weight: weightS // Number
              };
              console.log('added data:', updatedData);
              
              // Add the object to a Firestore collection
              const docRef = doc(usersSchedulesRef, id);
              await updateDoc(docRef, updatedData);
              console.log("Document written with ID: ", docRef.id);
    
              navigate('/userschedule')
            //   getUserSchedules();

        } catch (error) {
            console.log(error);
            
        }
    }

    const submitData = (e) => {
        e.preventDefault();

        updateUserSchedules();

        
    }

    const handleFieldFocus = (field) => {
        setSelectedField(field)
      }
    
      const handleFieldBlur = () => {
        setSelectedField(null)
      }

    const getFieldStyle = (field) => {
        return `w-full p-2 text-[12px] border rounded-md ${
          selectedField === field ? "bg-gray-100 outline-[none] border-[none]" : "border-gray-300"
        }`
      }

      useEffect(()=> {
        setCurrentPageData('Schedule Collection'); // set the current page so that active page of navbar is indicated
      }, [])
    
  return (
    <div className="flex items-center justify-center relative bg-gray-100 flex-1 h-full overflow-y-auto overflow-x-hidden">
      <form 
        onSubmit={submitData}
        className="bg-white space-y-4 p-8 rounded-lg shadow-md w-[80%] mb-6">
        <h2 className="text-lg font-semibold mb-6 text-center text-gray-800">
            Schedule Special Garbage Collections
        </h2>
            <div>
            <select
                type="text"
                placeholder="Waste Type"
                className={getFieldStyle("wasteType")}
                value={wasteTypeS}
                onChange={(e)=> {setWasteType(e.target.value);
                }}
                onFocus={() => handleFieldFocus("wasteType")}
                onBlur={handleFieldBlur}
            >
                <option value="food">Food</option>
                <option value="polythene">Polythene/Plastic</option>
                <option value="electronics">Electronics</option>
                <option value="paper">Paper</option>
            </select>
            </div>
            <div>
            <input
                type="number"
                placeholder="Weight(kg)"
                className={getFieldStyle("weight")}
                value={weightS}
                onChange={(e) => setWeight(e.target.value)}
                onFocus={() => handleFieldFocus("weight")}
                onBlur={handleFieldBlur}
            />
            </div>
            <div className="relative">
            <input
                type="time"
                placeholder="Time"
                className={`${getFieldStyle("time")} pl-10`}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                onFocus={() => handleFieldFocus("time")}
                onBlur={handleFieldBlur}
            />
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="relative">
            <input
                type="date"
                placeholder="Date"
                className={`${getFieldStyle("date")} pl-10`}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onFocus={() => handleFieldFocus("date")}
                onBlur={handleFieldBlur}
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            
            <button
            type="submit"
            className="w-full bg-primary_yellow text-[12px] font-bold text-gray-800 py-2 px-4 rounded-md hover:bg-[#d3d84f] transition-colors duration-300"
            >
            Update Schedule
            </button>
        </form>
    </div>
  )
}
