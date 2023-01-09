import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

const Tenants = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tenantTable, setTenantTable] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profile, setProfile] = useState({});
  const [myTenants, setMyTenants] = useState([]);

  const API = axios.create({ baseURL: process.env.REACT_APP_API });
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
    .then(({ data }) => setIsAdmin(data.isAdmin))
    .catch((err) => console.log(err));
  // console.log(profile.userId);

  const getProfile = async () => {
    const { data } = await API.get("/profile/me");
    setProfile(data);
    console.log("profile", profile);
    // console.log(data);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const getAllTenants = async () => {
    try {
      const { data } = await API.get("/tenant/get-all");
      console.log(data);
      setTenantTable(data);
    } catch (err) {
      console.log(err);
    }
  };
  const getMyTenants = async () => {
    try {
      const { data } = await API.post("/tenant/get-by-customer-id", {
        customerId: profile.userId,
      });
      // console.log(data);

      setMyTenants(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    isAdmin ? getAllTenants() : getMyTenants();
  }, []);

  const columns = [
    // { field: "sl_no", headerName: "SL. NO" },
    { field: "userId", headerName: "Tenant ID", flex: 1 },
    // {
    //   field: "user",
    //   headerName: "User Name",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
    {
      field: "firstName",
      headerName: "First Name",

      // type: "number",
      // headerAlign: "left",
      // align: "left",
    },
    {
      field: "lastName",
      headerName: "Last Name",

      // type: "number",
      // headerAlign: "left",
      // align: "left",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "contact_number",
      headerName: "Contact Number",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      // type: "number",
      // headerAlign: "left",
      // align: "left",
    },

    // {
    //   field: "phone",
    //   headerName: "Phone Number",
    //   flex: 1,
    // },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   flex: 1,
    // },
  ];

  return (
    <Box m="20px">
      <Header title="TENANTS" subtitle="Here is the tenants list" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {
          <DataGrid
            checkboxSelection
            rows={isAdmin ? tenantTable : myTenants}
            columns={columns}
            getRowId={(row) => row.userId}
          />
        }
      </Box>
    </Box>
  );
};

export default Tenants;
