import { useState, useContext, useEffect } from "react"
import { Scale, Calendar, Clock, Edit, Trash2 } from "lucide-react"
import { GlobalDataContext } from '../../../context/globalData'
import TopNav from "../../../components/common/topnav/TopNav"
import ScheduleCard from "../../../components/IT21211232/schedulecard/ScheduleCard"

// firebase imports
import { collection, getDocs, addDoc, Timestamp, GeoPoint } from "firebase/firestore" // imported from the firestore
import {db} from '../../../config/firebase'; // imported from the firebase file in config

export default function dashboard() {
  const {currentPage, setCurrentPageData} = useContext(GlobalDataContext)
  const [wasteType, setWasteType] = useState("food")
  const [weight, setWeight] = useState("")
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")
  const [selectedField, setSelectedField] = useState(null)

  // retrieved from the database
  const [userschedules, setUserSchedules] = useState([]);

  const usersSchedulesRef = collection(db, "userSchedules")
  
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

  // fetch the user schedules
  const getUserSchedules = async () => {
    const data = await getDocs(usersSchedulesRef);
    setUserSchedules(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
  }

  const insertUserSchedules = async () => {
    try {
        // combning the date and time into a single string
        const dateTimeStr = `${date}T${time}:00`;
        const combinedDateTime = new Date(dateTimeStr);

        // creating a firestore timestamp
        const firestoretimestamp = Timestamp.fromDate(combinedDateTime)

        const addedData = {
            date_time: firestoretimestamp, // Firestore Timestamp
            location: new GeoPoint(45, 76), // GeoPoint
            locationName: "Colombo, Sri Lanka", // String
            type: wasteType, // String
            userId: "tr53hy7e83n83", // String
            weight: weight // Number
          };
          console.log('added data:', addedData);
          
          // Add the object to a Firestore collection
          const docRef = await addDoc(usersSchedulesRef, addedData);
          console.log("Document written with ID: ", docRef.id);

          getUserSchedules();
    } catch (error) {
        console.log(error);
        
    }
  }

  const submitData = (e) => {
    e.preventDefault();

    const dataObject = {
        wasteType: wasteType,
        weight: weight,
        time: time,
        date: date
    }
    console.log('trigger una bn');
    
    insertUserSchedules();
    
  }

  useEffect(()=> {
  setCurrentPageData('Schedule Collection'); // set the current page so that active page of navbar is indicated
  getUserSchedules(); // function called to fetch the user schedules
}, [])

  return (
    <div className="relative bg-gray-100 flex-1 h-full overflow-y-auto overflow-x-hidden">
        <TopNav title={"Schedule Collection"}/>
    {/*Selection container*/}
        <div className="flex flex-col items-center w-[50%] mt-3 pt-14">
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
                value={wasteType}
                // onChange={(e) => setWasteType(e.target.value)}
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
                value={weight}
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
            Schedule Collection
            </button>
        </form>

        {
            userschedules &&
            userschedules.map((data, index)=> (
                <ScheduleCard key={index} data={data}/>
            ))
        }
        {/* <ScheduleCard/>
        <ScheduleCard/>
        <ScheduleCard/> */}

        </div>
    </div>
  )
}