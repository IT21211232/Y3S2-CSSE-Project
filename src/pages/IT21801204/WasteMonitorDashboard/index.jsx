import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { QRCodeSVG } from "qrcode.react";

const WasteMonitorDashboardPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");
  const [wasteData, setWasteData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(""); // New state for user ID
  const [showQRCode, setShowQRCode] = useState(false); // State to toggle QR code visibility

  const fetchWasteData = async () => {
    setLoading(true);
    const now = new Date();
    let startDate;

    if (selectedPeriod === "weekly") {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // Subtract 7 days in milliseconds
    } else if (selectedPeriod === "monthly") {
      startDate = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
    } else {
      startDate = new Date("2024-01-01"); // Custom start date
    }

    try {
      const q = query(
        collection(db, "userSchedules"),
        where("date_time", ">=", startDate)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());

      // Assuming user ID is stored in each waste data entry
      if (data.length > 0) {
        setUserId(
          `http://localhost:5173/dashboard/waste-monitor?uid=${data[0].userId}`
        ); // Get user ID from the first entry (adjust as needed)
      }

      setWasteData(data);
    } catch (error) {
      console.error("Error fetching waste data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWasteData();
  }, [selectedPeriod]);

  const formatDate = (timestamp) => {
    const date = timestamp.toDate(); // Convert Firestore Timestamp to JS Date

    // Format date as DD/MM/YYYY, Time (24-hour format)
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  };

  const handleShowQRCode = () => {
    setShowQRCode(!showQRCode); // Toggle QR code visibility
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] w-full p-4">
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className="mx-10">
          <h2 className="text-2xl font-bold my-4">
            Welcome to Waste Monitor Dashboard...
          </h2>
          <p>Select a time period to view your waste data:</p>
          <select
            className="border rounded p-2 mt-2 mb-6"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="custom">All</option>
          </select>
          <button
            className="mt-4 bg-[#dee140] text-black py-2 px-4 rounded"
            onClick={fetchWasteData}
          >
            View Waste Data
          </button>

          {/* Display Data in Table */}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Waste Data Summary</h3>
            <table className="table-auto w-full text-left border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Waste Type</th>
                  <th className="border px-4 py-2">Location Name</th>
                  <th className="border px-4 py-2">Weight (kg)</th>
                  <th className="border px-4 py-2">Location (Geopoint)</th>
                </tr>
              </thead>
              <tbody>
                {wasteData.length > 0 ? (
                  wasteData.map((entry, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">
                        {formatDate(entry.date_time)}
                      </td>
                      <td className="border px-4 py-2">{entry.type}</td>
                      <td className="border px-4 py-2">{entry.locationName}</td>
                      <td className="border px-4 py-2">{entry.weight}</td>
                      <td className="border px-4 py-2">{`[${entry.location.latitude}°, ${entry.location.longitude}°]`}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No data available for the selected period.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* QR Code Section */}
          {userId && (
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">User ID QR Code</h3>
              <button
                className="mt-2 bg-[#dee140] text-black py-2 px-4 rounded"
                onClick={handleShowQRCode}
              >
                {showQRCode ? "Hide QR Code" : "Show QR Code"}
              </button>
              {showQRCode && (
                <div className="mt-4">
                  <QRCodeSVG value={userId} size={128} />{" "}
                  {/* QR code with user ID */}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WasteMonitorDashboardPage;
