import { Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useState } from "react";
// import SidebarComponent from "./Components/Sidebar";
import Topbar from "./Components/Topbar";
import Sidebar from "./Components/Sidebar";
import Devices from "./Components/Devices";
import Graph from "./Components/Graph";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/devices" element={<Devices />} />
              <Route path="/values" element={<Graph />} />
              {/* <Route path="/login" element={<Login />} /> */}
              {/* <Route path="/home" element={<Home />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
