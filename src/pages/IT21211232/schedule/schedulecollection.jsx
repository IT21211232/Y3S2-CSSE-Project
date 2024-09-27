import { useState, useContext, useEffect } from "react"
import { Scale, Calendar, Clock, Edit, Trash2 } from "lucide-react"
import { GlobalDataContext } from '../../../context/globalData'
import TopNav from "../../../components/common/topnav/TopNav"
import ScheduleCard from "../../../components/IT21211232/schedulecard/ScheduleCard"

export default function dashboard() {
  const {currentPage, setCurrentPageData} = useContext(GlobalDataContext)
  const [wasteType, setWasteType] = useState("")
  const [weight, setWeight] = useState("")
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")
  const [selectedField, setSelectedField] = useState(null)

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
  setCurrentPageData('Schedule Collection');
}, [])

  return (
    <div className="relative bg-gray-100 flex-1 h-full overflow-y-auto overflow-x-hidden">
        <TopNav title={"Schedule Collection"}/>
    {/*Selection container*/}
        <div className="flex flex-col items-center w-[50%] mt-3 pt-14">
        <h2 className="text-lg font-semibold mb-6 text-center text-gray-800">
            Schedule Special Garbage Collections
        </h2>
        <form className="bg-white space-y-4 p-8 rounded-lg shadow-md w-[80%] mb-6">
            <div>
            <select
                type="text"
                placeholder="Waste Type"
                className={getFieldStyle("wasteType")}
                value={wasteType}
                onChange={(e) => setWasteType(e.target.value)}
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
            <button
            type="button"
            className="w-full bg-gray-200 text-[12px] font-semibold text-gray-400 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-300"
            >
            View Schedules
            </button>
        </form>

        <ScheduleCard/>
        <ScheduleCard/>
        <ScheduleCard/>
        <ScheduleCard/>

        </div>
    </div>
  )
}