import React from "react";
import { Box } from "@mui/material";
import Header from "./Header.js";
import Topbar from "./Topbar.js";
import { useState } from "react";
import { ColorModeContext, useMode } from "../theme";
import Value from "./Value";

const Home = ({ header }) => {
  const [theme, colorMode] = useMode();
  return (
    <Box m="20px">
      {header ? (
        <>
          <Header title="REPORTS" subtitle="Know your weekly, montly reports" />
          <Value />
        </>
      ) : (
        <Topbar login />
      )}
    </Box>
  );
};

export default Home;
