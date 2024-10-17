import React from "react";
import {CircleChevronLeft, CircleChevronRight} from 'lucide-react'

// Calendar component that takes date and wasteType as props
const Calendar = ({ wasteSchedule , scheduleData}) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  // Get the number of days in the current month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  
  // Get the first day of the month to align the start of the grid
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  // Function to move to the previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Function to move to the next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Function to check if a waste schedule exists for a date
  const getWasteForDate = (date) => {
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, "0")}-${date.toString().padStart(2, "0")}`;
    return wasteSchedule[formattedDate] || null;
  };

  // Render the calendar grid
  const renderCalendar = () => {
    const days = [];
    
    // Empty slots for days of the previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24"></div>);
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const wasteForDate = getWasteForDate(day);

      days.push(
        <div key={day} className="border p-2 h-24 text-center">
          <div className="font-bold mb-1">{day}</div>
          {wasteForDate && (
            <div className="text-xs mt-2 bg-yellow-100 p-1 rounded w-fit">
              {wasteForDate}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToPreviousMonth} className="text-lg p-2">
        <CircleChevronLeft />
        </button>
        <div>
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </div>
        <button onClick={goToNextMonth} className="text-lg p-2">
          <CircleChevronRight/>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-bold text-center">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
