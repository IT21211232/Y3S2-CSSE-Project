import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import Modal from 'react-modal';
import CustomNotification from "../../../components/IT21832826/CustomNotification";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function PaymentRate() {
  const [currentData, setCurrentData] = useState(0);
  const [pastData, setPastData] = useState(0);
  const [paymentRate, setPaymentRate] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [newPaymentRate, setNewPaymentRate] = useState('');
  const { openNotification } = CustomNotification();

  // Fetch current and past waste data
  const fetchWasteData = async () => {
    try {
      const currentQuerySnapshot = await getDocs(collection(db, "userSchedules"));
      const pastQuerySnapshot = await getDocs(collection(db, "pastUserSchedules"));

      const currentTotalWaste = currentQuerySnapshot.docs.reduce((total, doc) => {
        return total + (doc.data().weight || 0);
      }, 0);

      const pastTotalWaste = pastQuerySnapshot.docs.reduce((total, doc) => {
        return total + (doc.data().weight || 0);
      }, 0);

      setCurrentData(currentTotalWaste);
      setPastData(pastTotalWaste);
    } catch (error) {
      console.error("Error fetching waste data: ", error);
    }
  };

  // Fetch payment rate
  const fetchPaymentRate = async () => {
    try {
      const paymentRateDoc = await getDocs(collection(db, "paymentRate"));
      const rate = paymentRateDoc.docs[0].data().rate;
      setPaymentRate(rate);
    } catch (error) {
      console.error("Error fetching payment rate: ", error);
    }
  };

  const handleSaveNewRate = async () => {
    try {
      const rateDocRef = doc(db, "paymentRate", "2VsjUZncHm3IM7tYM0m7");
      await updateDoc(rateDocRef, {
        rate: parseFloat(newPaymentRate),
      });
      openNotification("success", "Payment Rate Updated", `New rate is now set to ${newPaymentRate}`);
      setPaymentRate(parseFloat(newPaymentRate));
      setNewPaymentRate('');
      setShowModal(false);
    } catch (error) {
      console.error("Error updating payment rate: ", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchWasteData();
    fetchPaymentRate();
  }, []);

  const data = {
    labels: ["Current Waste", "Past Waste"],
    datasets: [
      {
        label: "Total Waste (Kg)",
        data: [currentData, pastData],
        backgroundColor: ["#fcb900", "#4caf50"],
        hoverBackgroundColor: ["#d3d84f", "#388e3c"],
      },
    ],
  };

  return (
    <div className="p-8 flex-1 h-full overflow-y-auto overflow-x-hidden">
      <h2 className="text-lg font-semibold mb-6 text-center text-gray-800">Waste Statistics</h2>
      <Bar data={data} options={{ maintainAspectRatio: false }} height={400} />

      <div className="flex justify-between items-center mt-8">
        <div className="text-gray-800">
          <p className="font-bold text-md">Current Payment Rate:</p>
          <p>{paymentRate} / Kg</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary_yellow text-[12px] font-bold text-gray-800 py-1 px-3 rounded-md hover:bg-[#d3d84f]"
        >
          Update Payment Rate
        </button>
      </div>

      {/* Modal for updating payment rate */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="bg-white p-8 rounded-lg shadow-md w-[400px] mx-auto my-20"
      >
        <h3 className="text-lg font-semibold mb-4">Update Payment Rate</h3>
        <input
          type="number"
          value={newPaymentRate}
          onChange={(e) => setNewPaymentRate(e.target.value)}
          placeholder="Enter new rate"
          className="w-full p-2 border rounded-md border-gray-300 mb-4"
        />
        <button
          onClick={handleSaveNewRate}
          className="w-full bg-primary_yellow text-[12px] font-bold text-gray-800 py-2 px-4 rounded-md hover:bg-[#d3d84f] transition-colors duration-300"
        >
          Save
        </button>
      </Modal>
    </div>
  );
}
