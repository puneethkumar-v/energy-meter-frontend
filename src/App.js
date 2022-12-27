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
// import Devices from "./Components/Devices";
// import Graph from "./Components/Graph";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  // useEffect(() => {
  //   setUser(JSON.parse(localStorage.getItem("profile")));
  // }, [user]);

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
                <Route path="/" element={<Home header />} />
              ) : (
                <Route path="/" element={<Home />} />
              )}

              <Route path="/devices" element={<Devices />} />
              <Route path="/add-customer" element={<CustomerForm />} />
              <Route path="/device/:id" element={<Livechart />} />
              <Route path="/login" element={<Login />} />
              <Route path="add-tenant" element={<TenantForm />} />
              <Route path="/add-device" element={<DeviceForm />} />
              <Route path="/assign-device" element={<AssignDeviceForm />} />
              {/* <Route path="/home" element={<Home />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
