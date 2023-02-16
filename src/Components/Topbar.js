import { Box, IconButton, Typography, useTheme, Button } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { stateModifier } from "../features/slice";
import { useSelector } from "react-redux";

const Topbar = ({ login }) => {
  const auth = useSelector((state) => console.log(state));
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    dispatch(stateModifier(false));
    // window.location.href = "/login";
    navigate("/");
  }

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      {login ? (
        // <Typography variant="h2" fontWeight="bold">
        //   <Link
        //     to="/"
        //     style={{ textDecoration: "none", color: colors.grey[100] }}
        //   >
        //     EAPL
        //   </Link>
        // </Typography>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography variant="h2" color={colors.grey[100]} fontWeight="bold">
            EAPL
          </Typography>
        </Link>
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
      <Box display="flex" gap={login ? "10px" : "5px"}>
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
              <LogoutIcon />
            </IconButton>
          </>
        ) : (
          <Link
            to="/login"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              color="secondary"
              variant="contained"
              sx={{ fontWeight: "500" }}
            >
              Get started
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
