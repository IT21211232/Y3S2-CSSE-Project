import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { db } from "../../../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const defaultChartData = {
  labels: [],
  datasets: [
    {
      label: "Request Status",
      data: [],
      backgroundColor: [],
    },
  ],
};

const AdminDashboard = () => {
  const [statusChartData, setStatusChartData] = useState(defaultChartData);
  const [typeChartData, setTypeChartData] = useState(defaultChartData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getDocs(collection(db, "userSchedules"));
        const data = response.docs.map((doc) => doc.data());

        // Process data for the two charts
        const typeData = {};
        let collectedCount = 0;
        let notCollectedCount = 0;

        data.forEach((item) => {
          // Update count for type-based pie chart
          const { type, collected, weight } = item;
          if (type) {
            typeData[type] = (typeData[type] || 0) + weight;
          }

          // Update count for collected/not collected pie chart
          if (collected) {
            collectedCount++;
          } else {
            notCollectedCount++;
          }
        });

        // Prepare data for the pie charts
        setTypeChartData({
          labels: Object.keys(typeData),
          datasets: [
            {
              data: Object.values(typeData),
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
              ],
            },
          ],
        });

        setStatusChartData({
          labels: ["Collected", "Not Collected"],
          datasets: [
            {
              data: [collectedCount, notCollectedCount],
              backgroundColor: ["#4BC0C0", "#FF9F40"],
              hoverBackgroundColor: ["#4BC0C0", "#FF9F40"],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2
        className="text-lg font-semibold mb-6 text-center text-gray-800"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "20px",
          marginLeft: "220px",
          marginTop: "20px",
        }}
      >
        Dashboard
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "20px",
          marginLeft: "230px",
          marginTop: "20px",
        }}
        className="bg-primary_yellow"
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div
            style={{ display: "flex", gap: "50px", alignItems: "flex-start" }}
          >
            <div style={{ textAlign: "center" }}>
              <h3>Weight Distribution by Type</h3>
              <Pie
                data={typeChartData}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
                    },
                  },
                }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <h3>Request Status</h3>
              <Pie
                data={statusChartData}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
                    },
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
