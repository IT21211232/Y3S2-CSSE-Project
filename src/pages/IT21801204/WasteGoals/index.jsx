import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";

const WasteGoalsPage = () => {
  const userId = "tr53hy7e83n83"; // Hardcoded user ID
  const [goal, setGoal] = useState("");
  const [threshold, setThreshold] = useState("");
  const [goals, setGoals] = useState([]);
  const [userWasteData, setUserWasteData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "wasteGoals"));
      const goalsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGoals(goalsData);
    } catch (error) {
      console.error("Error fetching goals: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserWasteData = async () => {
    try {
      const q = query(
        collection(db, "userSchedules"),
        where("userId", "==", userId) // Ensure to filter by userId
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());

      // Calculate total weight
      const totalWeight = data.reduce(
        (acc, curr) => acc + parseFloat(curr.weight),
        0
      );
      setUserWasteData(totalWeight); // Store total weight
    } catch (error) {
      console.error("Error fetching user waste data: ", error);
    }
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!goal || !threshold) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      await addDoc(collection(db, "wasteGoals"), {
        userId,
        goal,
        threshold: parseFloat(threshold), // Store as a number
        createdAt: new Date(),
      });
      setGoal("");
      setThreshold("");
      fetchGoals(); // Refresh the goals list
    } catch (error) {
      console.error("Error adding goal: ", error);
    }
  };

  useEffect(() => {
    fetchGoals();
    fetchUserWasteData(); // Fetch waste data when component mounts
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f4f4] w-full p-4">
      <h2 className="text-2xl font-bold mb-4 mt-6">
        Set Waste Reduction Goals
      </h2>
      <form onSubmit={handleAddGoal} className="mb-6">
        <div className="mb-4">
          <label className="block mb-1">Goal Description:</label>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Threshold (kg):</label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#dee140] text-black py-2 px-4 rounded"
        >
          Add Goal
        </button>
      </form>

      {loading ? (
        <p>Loading goals...</p>
      ) : (
        <div>
          <h3 className="text-xl font-bold mb-4">Your Goals</h3>
          {goals.length > 0 ? (
            <table className="table-auto w-full text-left border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Goal</th>
                  <th className="border px-4 py-2">Threshold (kg)</th>
                  <th className="border px-4 py-2">Date Created</th>
                  <th className="border px-4 py-2">Threshold Met?</th>
                </tr>
              </thead>
              <tbody>
                {goals.map((entry) => {
                  const isThresholdMet = userWasteData >= entry.threshold; // Compare user's total weight with goal threshold
                  return (
                    <tr key={entry.id}>
                      <td className="border px-4 py-2">{entry.goal}</td>
                      <td className="border px-4 py-2">{entry.threshold}</td>
                      <td className="border px-4 py-2">
                        {new Date(
                          entry.createdAt.seconds * 1000
                        ).toLocaleString()}{" "}
                        {/* Format date */}
                      </td>
                      <td className="border px-4 py-2">
                        {isThresholdMet ? "Yes" : "No"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No goals set yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default WasteGoalsPage;
