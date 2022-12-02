import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Topbar = ({ login }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const API = axios.create({ baseURL: process.env.REACT_APP_API });
  // axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).accessToken
      }`;
    }

    return req;
  });
  API.get("/auth/is-admin", {
    headers: {},
  })
    .then(({ data }) => {
      console.log(data);
      setIsAdmin(data.isAdmin);
    })
    .catch((err) => console.log(err));

  function handleLogout() {
    localStorage.removeItem("profile");
    window.location.href = "/login";
  }

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      {login ? (
        <Typography variant="h3" color={colors.grey[100]}>
          EAPL
        </Typography>
      ) : (
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
      )}

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        {!login ? (
          <>
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>
            <IconButton onClick={handleLogout}>
              <PersonOutlinedIcon />
            </IconButton>
          </>
        ) : null}
      </Box>
    </Box>
  );
};

export default Topbar;
