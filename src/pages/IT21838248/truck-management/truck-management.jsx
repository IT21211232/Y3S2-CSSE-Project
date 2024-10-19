import React, { useState, useEffect, useContext } from "react";
import { GlobalDataContext } from '../../../context/globalData';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import CustomNotification from "../../../components/IT21832826/CustomNotification";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function ManageTrucks() {
  const { setCurrentPageData } = useContext(GlobalDataContext);
  const [trucks, setTrucks] = useState([]);
  const [collectors, setCollectors] = useState([]);
  const [truckName, setTruckName] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [selectedCollector, setSelectedCollector] = useState("");
  const [truckId, setTruckId] = useState(null); // Track the current truck ID for updates
  const [confirmDelete, setConfirmDelete] = useState(null); // Track the truck ID to confirm delete
  const { openNotification } = CustomNotification();

  const fetchTrucks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "trucks"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTrucks(data);
    } catch (error) {
      console.error("Error fetching trucks: ", error);
    }
  };

  const fetchCollectors = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "collectors"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCollectors(data);
    } catch (error) {
      console.error("Error fetching collectors: ", error);
    }
  };

  const handleAddTruck = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "trucks"), { truckName, plateNumber, collector: selectedCollector });
      openNotification("success", "Truck Added", `Truck ${truckName} has been added successfully.`);
      resetForm();
      fetchTrucks(); // Refresh the trucks list
    } catch (error) {
      console.error("Error adding truck: ", error);
    }
  };

  const handleUpdateTruck = async (e) => {
    e.preventDefault();
    if (truckId && truckName && plateNumber && selectedCollector) {
      try {
        const truckRef = doc(db, "trucks", truckId);
        await updateDoc(truckRef, { truckName, plateNumber, collector: selectedCollector });
        openNotification("success", "Truck Updated", `Truck has been updated successfully.`);
        resetForm();
        fetchTrucks(); // Refresh the trucks list
      } catch (error) {
        console.error("Error updating truck: ", error);
      }
    }
  };

  const handleDeleteTruck = async (id) => {
    try {
      await deleteDoc(doc(db, "trucks", id));
      openNotification("success", "Truck Deleted", `Truck has been deleted successfully.`);
      setConfirmDelete(null); // Reset confirmation
      fetchTrucks(); // Refresh the trucks list
    } catch (error) {
      console.error("Error deleting truck: ", error);
    }
  };

  const confirmDeleteTruck = (id) => {
    setConfirmDelete(id); // Set the ID to confirm deletion
  };

  const handleEditClick = (truck) => {
    setTruckName(truck.truckName);
    setPlateNumber(truck.plateNumber);
    setSelectedCollector(truck.collector); // Set the selected collector for editing
    setTruckId(truck.id);
  };

  const resetForm = () => {
    setTruckName("");
    setPlateNumber("");
    setSelectedCollector("");
    setTruckId(null); // Reset the current truck ID
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Truck Details", 14, 22);

    const headers = ["Truck Name", "Plate Number", "Collector"];
    const data = trucks.map((truck) => [
      truck.truckName,
      truck.plateNumber,
      truck.collector
    ]);

    autoTable(doc, {
      head: [headers],
      body: data,
      startY: 30,
      styles: {
        cellPadding: 5,
        fontSize: 12,
        overflow: 'linebreak',
        tableWidth: 'auto',
        halign: 'left',
      },
      headStyles: {
        fillColor: [22, 160, 133], // Dark gray for header
        textColor: [255, 255, 255], // White text
        fontSize: 14,
      },
      bodyStyles: {
        fillColor: [255, 255, 255], // White for body
        textColor: [0, 0, 0], // Black text
      },
      theme: 'grid',
    });

    doc.save("trucks.pdf");
  };
  

  useEffect(() => {
    setCurrentPageData("Manage Trucks");
    fetchTrucks();
    fetchCollectors(); // Fetch collectors when the component mounts
  }, []);

  return (
    <div className="p-8 flex-1 h-full overflow-y-auto overflow-x-hidden">
      <h2 className="text-lg font-semibold mb-6 text-center text-gray-800">Manage Trucks</h2>

      {/* Form to Add or Update Trucks */}
      <form onSubmit={truckId ? handleUpdateTruck : handleAddTruck} className="mb-6">
        <input
          type="text"
          value={truckName}
          onChange={(e) => setTruckName(e.target.value)}
          placeholder="Truck Name"
          className="border rounded-md p-2 mr-2"
          required
        />
        <input
          type="text"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
          placeholder="Plate Number"
          className="border rounded-md p-2 mr-2"
          required
        />
        <select
          value={selectedCollector}
          onChange={(e) => setSelectedCollector(e.target.value)}
          className="border rounded-md p-2 mr-2"
          required
        >
          <option value="">Select a Collector</option>
          {collectors.map((collector) => (
            <option key={collector.id} value={collector.collectorName}>
              {collector.collectorName}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-primary_yellow text-gray-800 py-2 px-4 rounded-md hover:bg-[#d3d84f] transition-colors duration-300"
        >
          {truckId ? "Update Truck" : "Add Truck"}
        </button>
      </form>

      <button
        onClick={downloadPDF}
        className="bg-primary_yellow text-black py-2 px-4 rounded-md mb-4 transition-colors duration-300"
      >
        <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
        Download PDF
      </button>

      {/* Table to Display Trucks */}
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left">
            <th className="p-4">Truck Name</th>
            <th className="p-4">Plate Number</th>
            <th className="p-4">Collector</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trucks.map((truck) => (
            <tr key={truck.id}>
              <td className="p-4">{truck.truckName}</td>
              <td className="p-4">{truck.plateNumber}</td>
              <td className="p-4">{truck.collector}</td>
              <td className="p-4 flex space-x-2">
                <button
                  onClick={() => handleEditClick(truck)}
                  className="text-blue-500"
                  title="Edit"
                >
                  <FontAwesomeIcon icon={faEdit} style={{ color: '#4A90E2' }} />
                </button>
                <button
                  onClick={() => confirmDeleteTruck(truck.id)}
                  className="text-red-500"
                  title="Delete"
                >
                  <FontAwesomeIcon icon={faTrash} style={{ color: '#E94E77' }} />
                </button>
                {confirmDelete === truck.id && (
                  <div className="absolute bg-white border rounded shadow-lg p-4 mt-2">
                    <p>Are you sure you want to delete this truck?</p>
                    <button
                      onClick={() => handleDeleteTruck(truck.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded mr-2"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="bg-gray-300 py-1 px-2 rounded"
                    >
                      No
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
