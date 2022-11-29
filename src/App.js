import { Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useState } from "react";
import Devices from "./Components/Devices";
import Graph from "./Components/Graph";
// import SidebarComponent from "./Components/Sidebar";
import Topbar from "./Components/Topbar";
import Sidebar from "./Components/Sidebar";
import Login from "./Components/Login";
// import Devices from "./Components/Devices";
// import Graph from "./Components/Graph";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

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
              <Route path="/" element={<Home />} />
              <Route path="/devices" element={<Devices />} />
              <Route path="/values" element={<Graph />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/home" element={<Home />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
