import { Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useState, useEffect } from "react";
import Devices from "./Components/Devices";
import DeviceForm from "./Components/DeviceForm";
// import SidebarComponent from "./Components/Sidebar";
import Topbar from "./Components/Topbar";
import Livechart from "./Components/Livechart";
import Sidebar from "./Components/Sidebar";
import Login from "./Components/Login";
import CustomerForm from "./Components/CustomerForm";
import TenantForm from "./Components/TenantForm";
import AssignDeviceForm from "./Components/AssignDeviceForm";
import Customers from "./Components/Customers";
import Tenants from "./Components/Tenants";
import SensorMaster from "./Components/SensorMaster";
import SensorsList from "./Components/SensorsList";
import Report from "./Components/Report";
import { useLocation } from "react-router-dom";
import Protected from "./Components/Protected";
// import Devices from "./Components/Devices";
// import Graph from "./Components/Graph";

function App() {
  const [user, setUser] = useState(null);
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
    console.log("user exist");
  }, [location]);

  console.log("User from outside useeffect", user);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          {user && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {user && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/signup" element={<Signup />} />
              {user ? (
                <Route
                  path="/"
                  element={
                    <Protected>
                      <Home header />{" "}
                    </Protected>
                  }
                />
              ) : (
                <Route
                  path="/"
                  element={
                    <Protected>
                      <Home />
                    </Protected>
                  }
                />
              )}

              <Route path="/devices" element={<Devices />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/tenants" element={<Tenants />} />
              <Route path="/add-customer" element={<CustomerForm />} />
              <Route path="/devices/:device_id" element={<Livechart />} />
              <Route path="/login" element={<Login />} />
              <Route path="add-tenant" element={<TenantForm />} />
              <Route path="sensor-master" element={<SensorMaster />} />
              <Route path="/add-device" element={<DeviceForm />} />
              <Route path="/report" element={<Report />} />
              <Route path="/assign-device" element={<AssignDeviceForm />} />
              <Route path="/sensor-list" element={<SensorsList />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
