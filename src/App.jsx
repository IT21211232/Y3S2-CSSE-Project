import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// context provider
import GlobalDataContextProvider from "./context/globalData";

// components
import SideNav from "./components/common/sidenav/SideNav";

// pages
import Userdashboard from "./pages/IT21211232/dashboard/dashboard.jsx";
import ScheduleCollection from "./pages/IT21211232/schedule/schedulecollection.jsx";
import UpdateSchedule from "./pages/IT21211232/updateSchedule/UpdateSchedule.jsx";

// Shalinda Imports
import {
  LoginPage,
  RegisterPage,
  WasteGeneratedOverTimePage,
  WasteGoalsPage,
  WasteMonitorDashboardPage,
  WastePropotionsPage,
  WasteTypesPage,
} from "./pages/IT21801204";
// Shalinda Imports End

function App() {
  const [count, setCount] = useState(0);

  return (
    <GlobalDataContextProvider>
      <div className="main flex h-screen w-full">
        <Router>
          <SideNav type={"user"} />
          <Routes>
            <Route path="/userdashboard" element={<Userdashboard />} />
            <Route path="/userschedule" element={<ScheduleCollection />} />
            <Route path="/userscheduleupdate" element={<UpdateSchedule />} />
          </Routes>

          {/* Shalinda Routes */}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard/waste-monitor"
              element={<WasteMonitorDashboardPage />}
            />
            <Route
              path="/chart/waste-generated-overtime"
              element={<WasteGeneratedOverTimePage />}
            />
            <Route path="/chart/waste-types" element={<WasteTypesPage />} />
            <Route
              path="/chart/waste-propotions"
              element={<WastePropotionsPage />}
            />
            <Route path="/waste-goals" element={<WasteGoalsPage />} />
          </Routes>
          {/* Shalinda Routes End */}
        </Router>
      </div>
    </GlobalDataContextProvider>
  );
}

export default App;
