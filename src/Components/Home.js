import React from "react";

import { useState } from "react";
import { ColorModeContext, useMode } from "../theme";

const Home = () => {
  const [theme, colorMode] = useMode();
  return (
    <>
      <h1>Welcome here</h1>
    </>
  );
};

export default Home;
