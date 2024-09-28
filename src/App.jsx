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
import UserPayment from "./pages/IT21211232/payments/Payments.jsx";

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
import PaymentPortal from "./pages/IT21211232/paymentPortal/PaymentPortal.jsx";
// Shalinda Imports End

// Akila Imports
import AssignCollectors from "./pages/IT21832826/assign-collectors/assign-collectors.jsx";
import ViewData from "./pages/IT21832826/view-all-data/view-data.jsx";
import PaymentRate from "./pages/IT21832826/payment-rate/payment-rate.jsx";
import ManageTrucks from "./pages/IT21838248/truck-management/truck-management.jsx";
import ManageDumpLocations from "./pages/IT21832826/manage-locations/manage-locations.jsx";
// Akila Imports End

function App() {
  const [count, setCount] = useState(0);

  return (
    <GlobalDataContextProvider>
      <div className="main flex h-screen w-full">
        <Router>
          <SideNav type={"user"} />
          <Routes>
            <Route path="/user/dashboard" element={<Userdashboard />} />
            <Route path="/userschedule" element={<ScheduleCollection />} />
            <Route path="/userscheduleupdate" element={<UpdateSchedule />} />
            <Route path="/user/payment" element={<UserPayment />} />
            <Route path="/user/payment/portal" element={<PaymentPortal />} />
          </Routes>

          {/* Akila Routes */}
          <Routes>
            <Route path="/assigncollectors" element={<AssignCollectors />} />
            <Route path="/viewdata" element={<ViewData />} />
            <Route path="/paymentrate" element={<PaymentRate />} />
            <Route path="/manage-dump-locations" element={<ManageDumpLocations />} />
          </Routes>
          {/* Akila Routes End */}

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

          <Routes>
            <Route path="/manage-trucks" element={<ManageTrucks />} />
          </Routes>
        </Router>
      </div>
    </GlobalDataContextProvider>
  );
}

export default App;
