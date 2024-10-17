import React from "react";
import { Link } from "react-router-dom";

const WasteMonitorDashboardPage = () => {
  return (
    <div className="min-h-screen bg-[#f4f4f4] w-full">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Welcome!</h2>
        <p>Select a time period to view your waste data:</p>
        <select className="border rounded p-2 mt-2">
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="custom">Custom</option>
        </select>
        <Link to="/overview">
          <button className="mt-4 bg-[#dee140] text-black py-2 px-4 rounded">
            View Waste Data
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WasteMonitorDashboardPage;
