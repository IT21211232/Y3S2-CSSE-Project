import React, { useState, useEffect, useContext } from "react";
import { GlobalDataContext } from '../../../context/globalData';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import CustomNotification from "../../../components/IT21832826/CustomNotification";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function ManageDumpLocations() {
  const { setCurrentPageData } = useContext(GlobalDataContext);
  const [dumpLocations, setDumpLocations] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [locationName, setLocationName] = useState("");
  const [location, setLocation] = useState("");
  const [selectedTruck, setSelectedTruck] = useState("");
  const [dumpLocationId, setDumpLocationId] = useState(null); // Track the current dump location ID for updates
  const [confirmDelete, setConfirmDelete] = useState(null); // Track the dump location ID to confirm delete
  const { openNotification } = CustomNotification();

  const fetchDumpLocations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "dumpLocations"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDumpLocations(data);
    } catch (error) {
      console.error("Error fetching dump locations: ", error);
    }
  };

  const fetchTrucks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "trucks"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTrucks(data);
    } catch (error) {
      console.error("Error fetching trucks: ", error);
    }
  };

  const handleAddDumpLocation = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "dumpLocations"), { locationName, location, assignedTruck: selectedTruck });
      openNotification("success", "Dump Location Added", `Dump location ${locationName} has been added successfully.`);
      resetForm();
      fetchDumpLocations(); // Refresh the dump locations list
    } catch (error) {
      console.error("Error adding dump location: ", error);
    }
  };

  const handleUpdateDumpLocation = async (e) => {
    e.preventDefault();
    if (dumpLocationId && locationName && location && selectedTruck) {
      try {
        const dumpLocationRef = doc(db, "dumpLocations", dumpLocationId);
        await updateDoc(dumpLocationRef, { locationName, location, assignedTruck: selectedTruck });
        openNotification("success", "Dump Location Updated", `Dump location has been updated successfully.`);
        resetForm();
        fetchDumpLocations(); // Refresh the dump locations list
      } catch (error) {
        console.error("Error updating dump location: ", error);
      }
    }
  };

  const handleDeleteDumpLocation = async (id) => {
    try {
      await deleteDoc(doc(db, "dumpLocations", id));
      openNotification("success", "Dump Location Deleted", `Dump location has been deleted successfully.`);
      setConfirmDelete(null); // Reset confirmation
      fetchDumpLocations(); // Refresh the dump locations list
    } catch (error) {
      console.error("Error deleting dump location: ", error);
    }
  };

  const confirmDeleteDumpLocation = (id) => {
    setConfirmDelete(id); // Set the ID to confirm deletion
  };

  const handleEditClick = (dumpLocation) => {
    setLocationName(dumpLocation.locationName);
    setLocation(dumpLocation.location);
    setSelectedTruck(dumpLocation.assignedTruck); // Set the selected truck for editing
    setDumpLocationId(dumpLocation.id);
  };

  const resetForm = () => {
    setLocationName("");
    setLocation("");
    setSelectedTruck("");
    setDumpLocationId(null); // Reset the current dump location ID
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Dump Location Details", 14, 22);

    const headers = ["Location Name", "Location", "Assigned Truck"];
    const data = dumpLocations.map((dumpLocation) => [
      dumpLocation.locationName,
      dumpLocation.location,
      dumpLocation.assignedTruck
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

    doc.save("dump_locations.pdf");
  };

  useEffect(() => {
    setCurrentPageData("Manage Dump Locations");
    fetchDumpLocations();
    fetchTrucks(); // Fetch trucks when the component mounts
  }, []);

  return (
    <div className="p-8 flex-1 h-full overflow-y-auto overflow-x-hidden">
      <h2 className="text-lg font-semibold mb-6 text-center text-gray-800">Manage Dump Locations</h2>

      {/* Form to Add or Update Dump Locations */}
      <form onSubmit={dumpLocationId ? handleUpdateDumpLocation : handleAddDumpLocation} className="mb-6">
        <input
          type="text"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          placeholder="Location Name"
          className="border rounded-md p-2 mr-2"
          required
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="border rounded-md p-2 mr-2"
          required
        />
        <select
          value={selectedTruck}
          onChange={(e) => setSelectedTruck(e.target.value)}
          className="border rounded-md p-2 mr-2"
          required
        >
          <option value="">Select a Truck</option>
          {trucks.map((truck) => (
            <option key={truck.id} value={truck.truckName}>
              {truck.truckName}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-primary_yellow text-gray-800 py-2 px-4 rounded-md hover:bg-[#d3d84f] transition-colors duration-300"
        >
          {dumpLocationId ? "Update Location" : "Add Location"}
        </button>
      </form>

      <button
        onClick={downloadPDF}
        className="bg-primary_yellow text-black py-2 px-4 rounded-md mb-4 transition-colors duration-300"
      >
        <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
        Download PDF
      </button>

      {/* Table to Display Dump Locations */}
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left">
            <th className="p-4">Location Name</th>
            <th className="p-4">Location</th>
            <th className="p-4">Assigned Truck</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dumpLocations.map((dumpLocation) => (
            <tr key={dumpLocation.id}>
              <td className="p-4">{dumpLocation.locationName}</td>
              <td className="p-4">{dumpLocation.location}</td>
              <td className="p-4">{dumpLocation.assignedTruck}</td>
              <td className="p-4 flex space-x-2">
                <button
                  onClick={() => handleEditClick(dumpLocation)}
                  className="text-blue-500"
                  title="Edit"
                >
                  <FontAwesomeIcon icon={faEdit} style={{ color: '#4A90E2' }} />
                </button>
                <button
                  onClick={() => confirmDeleteDumpLocation(dumpLocation.id)}
                  className="text-red-500"
                  title="Delete"
                >
                  <FontAwesomeIcon icon={faTrash} style={{ color: '#E94E77' }} />
                </button>
                {confirmDelete === dumpLocation.id && (
                  <div className="absolute bg-white border rounded shadow-lg p-4 mt-2">
                    <p>Are you sure you want to delete this dump location?</p>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleDeleteDumpLocation(dumpLocation.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
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
