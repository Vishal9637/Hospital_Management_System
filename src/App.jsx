import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Rooms from "./pages/Rooms";
import AssignDoctor from "./pages/AssignDoctor";
import Billing from "./pages/Billing";

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        
        <Sidebar />

        <div className="flex-1 bg-gray-100 min-h-screen">
          <Navbar />

          <div className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/assign" element={<AssignDoctor />} />
              <Route path="/billing" element={<Billing />} />
            </Routes>
          </div>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;