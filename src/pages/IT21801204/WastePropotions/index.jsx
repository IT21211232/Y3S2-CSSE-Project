import React, { useState, useEffect, useMemo } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const WastePropotionsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");
  const [wasteData, setWasteData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [peakTime, setPeakTime] = useState(null); // New state for peak time

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

  const aggregatedData = useMemo(() => {
    const aggregated = wasteData.reduce(
      (acc, doc) => {
        const { type, weight, date_time } = doc;
        const parsedWeight = parseFloat(weight);

        // Total waste by type
        if (!acc.wasteByType[type]) acc.wasteByType[type] = 0;
        acc.wasteByType[type] += parsedWeight;

        // Waste trends over time
        const date = new Date(date_time.seconds * 1000).toLocaleDateString();
        if (!acc.wasteTrend[date]) acc.wasteTrend[date] = 0;
        acc.wasteTrend[date] += parsedWeight;

        return acc;
      },
      { wasteByType: {}, wasteTrend: {} } // Initial value for reduce
    );

    if (Object.keys(aggregated.wasteTrend).length > 0) {
      const peakDay = Object.keys(aggregated.wasteTrend).reduce((a, b) =>
        aggregated.wasteTrend[a] > aggregated.wasteTrend[b] ? a : b
      );
      setPeakTime(peakDay);
    }

    return aggregated;
  }, [wasteData]);

  const { wasteByType, wasteTrend } = aggregatedData;

  const barChartData = {
    labels: Object.keys(wasteByType).map((key) => key.toUpperCase()),
    datasets: [
      {
        label: "Total Waste by Type (kg)",
        data: Object.values(wasteByType),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const pieChartData = {
    labels: Object.keys(wasteByType).map((key) => key.toUpperCase()),
    datasets: [
      {
        label: "Waste Proportion by Type",
        data: Object.values(wasteByType),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const lineChartData = {
    labels: Object.keys(wasteTrend),
    datasets: [
      {
        label: "Waste Generation Over Time (kg)",
        data: Object.values(wasteTrend),
        fill: false,
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] w-full p-4">
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className="mx-10">
          <h2 className="text-2xl font-bold my-4">
            Patterns in waste production
          </h2>
          <p>Select a time period to view your waste data:</p>
          <select
            className="border rounded p-2 mt-2 mb-6"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="custom">Custom</option>
          </select>
          <button
            className="mt-4 bg-[#dee140] text-black py-2 px-4 rounded"
            onClick={fetchWasteData}
          >
            View Waste Data
          </button>

          {/* Display Peak Time */}
          {peakTime && (
            <div className="mt-6 text-lg text-center">
              <p className="font-semibold">
                Peak Waste Generation Day: {peakTime}
              </p>
            </div>
          )}

          {/* Render charts in structured layout */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mt-6">
            <div className="w-full max-w-md md:max-w-md mx-auto">
              <Doughnut data={pieChartData} />
              <h3 className="text-lg text-center mb-2 mt-4">
                Waste Proportion by Type
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WastePropotionsPage;
