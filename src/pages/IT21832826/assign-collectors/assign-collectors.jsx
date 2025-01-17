import React, { useState, useEffect, useContext } from "react";
import { Calendar, Clock, PlusCircle, ArrowRightCircle } from "lucide-react"; // Import your icon here
import { GlobalDataContext } from "../../../context/globalData";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import Modal from "react-modal";
import CustomNotification from "../../../components/IT21832826/CustomNotification";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import autoTable from "jspdf-autotable";

export default function AssignCollectors() {
  const { currentPage, setCurrentPageData } = useContext(GlobalDataContext);
  const [requests, setRequests] = useState([]);
  const [collectors, setCollectors] = useState([]);
  const [selectedCollector, setSelectedCollector] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [collectorName, setCollectorName] = useState(""); // State for collector name
  const { openNotification } = CustomNotification();

  const fetchData = async () => {
    try {
      const q = query(
        collection(db, "userSchedules"),
        where("status", "==", true),
        where("collected", "==", false)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCollectors = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "collectors"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setCollectors(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch collector name when modal opens
  const fetchCollectorName = async (requestId) => {
    const q = query(
      collection(db, "assignedCollector"),
      where("requested", "==", requestId)
    );
    const querySnapshot = await getDocs(q);
    const assignedData = querySnapshot.docs.map((doc) => doc.data());
    if (assignedData.length > 0) {
      setCollectorName(assignedData[0].collectorName); // Set the collector name from the first found document
    } else {
      setCollectorName(""); // Reset if no data found
    }
  };

  const handleAssignClick = (requestId) => {
    setCurrentRequestId(requestId);
    fetchCollectorName(requestId); // Fetch collector name when opening modal
    setShowModal(true);
  };

  const handleSaveAssignment = async () => {
    if (selectedCollector && currentRequestId) {
      try {
        await addDoc(collection(db, "assignedCollector"), {
          requested: currentRequestId,
          collectorName: selectedCollector,
        });
        openNotification(
          "success",
          "Collector Assigned",
          `Collector ${selectedCollector} has been assigned successfully.`
        );
        setShowModal(false);
        setSelectedCollector("");
        fetchData(); // Refresh the request data after assignment
      } catch (error) {
        console.error("Error updating collector: ", error);
      }
    }
  };

  const downloadPDF = async () => {
    const doc = new jsPDF();
    // Title
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0); // Set text color to black
    doc.text("Garbage Collection Requests", 14, 22);

    // Table header and data
    const headers = ["User ID", "Type", "Weight", "Location Name", "Date/Time"];
    const data = requests.map((request) => [
      request.userId,
      request.type,
      request.weight,
      request.locationName,
      new Date(request.date_time.seconds * 1000).toLocaleString(),
    ]);

    // Use autoTable to create the table with custom styles
    autoTable(doc, {
      head: [headers],
      body: data,
      startY: 40,
      styles: {
        overflow: "linebreak",
        fontSize: 10,
        cellPadding: 5,
        halign: "center", // Center the text in the cells
      },
      headStyles: {
        fillColor: [22, 160, 133], // Change this to your preferred header color
        textColor: [255, 255, 255], // White text color
        fontSize: 12,
        halign: "center", // Center header text
      },
      columnStyles: {
        0: { cellWidth: 40 }, // User ID
        1: { cellWidth: 30 }, // Type
        2: { cellWidth: 30 }, // Weight
        3: { cellWidth: 40 }, // Location Name
        4: { cellWidth: 50 }, // Date/Time
      },
    });

    // Save the PDF
    doc.save("garbage_collection_requests.pdf");
  };

  useEffect(() => {
    setCurrentPageData("Dashboard");
    fetchData();
    fetchCollectors();
  }, []);

  // Reset modal state on close
  const closeModal = () => {
    setShowModal(false);
    setSelectedCollector("");
    setCollectorName(""); // Reset collector name
  };

  return (
    <div className="p-8 flex-1 h-full overflow-y-auto overflow-x-hidden">
      <h2 className="text-lg font-semibold mb-6 text-center text-gray-800">
        Garbage Collection Requests
      </h2>
      <button
        onClick={downloadPDF}
        className="bg-primary_yellow text-[12px] font-bold text-gray-800 py-2 px-4 rounded-md mb-4 hover:bg-[#d3d84f] transition-colors duration-300"
      >
        Download PDF
      </button>
      <table
        id="requests-table"
        className="w-full bg-white rounded-lg shadow-md"
      >
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left">
            <th className="p-4">User ID</th>
            <th className="p-4">Type</th>
            <th className="p-4">Weight</th>
            <th className="p-4">Location Name</th>
            <th className="p-4">Location</th>
            <th className="p-4">Date/Time</th>
            <th className="p-4">Assign</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td className="p-4">{request.userId}</td>
              <td className="p-4">{request.type}</td>
              <td className="p-4">{request.weight}</td>
              <td className="p-4">{request.locationName}</td>
              <td className="p-4">{`${request.location._lat}, ${request.location._long}`}</td>
              <td className="p-4">
                {new Date(request.date_time.seconds * 1000).toLocaleString()}
              </td>
              <td className="p-4">
                <button
                  className="bg-transparent hover:bg-gray-200 rounded-full p-2"
                  onClick={() => handleAssignClick(request.id)}
                  title="Assign Collector"
                >
                  <ArrowRightCircle className="text-primary_yellow" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for assigning collectors */}
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        className="bg-white p-8 rounded-lg shadow-md w-[400px] mx-auto my-20"
      >
        <h3 className="text-lg font-semibold mb-4">Assign Collector</h3>
        <select
          value={selectedCollector}
          onChange={(e) => setSelectedCollector(e.target.value)}
          className="w-full p-2 text-[12px] border rounded-md border-gray-300 mb-4"
        >
          <option value="">Select a Collector</option>
          {collectors.map((collector) => (
            <option key={collector.collectorId} value={collector.collectorName}>
              {collector.collectorName}
            </option>
          ))}
        </select>
        <table className="w-full bg-gray-50 rounded-md mb-4">
          <thead>
            <tr className="text-gray-600">
              <th className="p-2">Assigned Collector</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">{collectorName || "Not assigned"}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end">
          <button
            onClick={handleSaveAssignment}
            className="bg-primary_yellow text-white py-2 px-4 rounded-md hover:bg-[#d3d84f] transition-colors duration-300"
          >
            Assign Collector
          </button>
        </div>
      </Modal>
    </div>
  );
}
