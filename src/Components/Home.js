import React from "react";
import { Box } from "@mui/material";
import Header from "./Header.js";
import Topbar from "./Topbar.js";
import { useState } from "react";
import { ColorModeContext, useMode } from "../theme";

const Home = ({ header }) => {
  const [theme, colorMode] = useMode();
  return (
    <Box m="20px">
      {header ? (
        <Header title="REPORTS" subtitle="Know your weekly, montly reports" />
      ) : (
        <Topbar login />
      )}
    </Box>
  );
};

export default Home;
