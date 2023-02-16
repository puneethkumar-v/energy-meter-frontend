import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Protected({ children }) {
  const auth = useSelector((state) => {
    console.log(state);
    if (state.auth.length > 0) {
      return state.auth[0].text;
    } else if (JSON.parse(localStorage.getItem("profile"))) {
      return true;
    } else {
      return false;
    }
  });
  console.log("auth", auth);
  if (!auth) {
    console.log("Unauth ", auth);
    return <Navigate to="/login" replace />;
  } else {
    console.log("child ", auth);
    return children;
  }
}
export default Protected;
