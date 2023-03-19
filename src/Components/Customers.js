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

const Customers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [arr, setArr] = useState([]);
  const [customerTable, setCustomerTable] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const API = axios.create({ baseURL: process.env.REACT_APP_API });
  const [count, setCount] = useState(0);
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

  const getAllCustomers = async () => {
    try {
      const { data } = await API.get("/tenant/get-all");
      console.log(data);
      setCustomerTable(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMyCustomers = async () => {
    try {
      const { data } = await API.post("/tenant/get-by-customer-id", {
        customerId: JSON.parse(localStorage.getItem("profile")).userId,
      });
      setCustomerTable(data);
    } catch (err) {
      console.log(err);
    }
  };
  isAdmin ? getAllCustomers() : getMyCustomers();
  // useEffect(() => {
  // }, []);

  const columns = [
    // { field: "sl_no", headerName: "SL. NO" },
    { field: "userId", headerName: "User ID", flex: 1 },
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
      <Header title="CUSTOMERS" subtitle="Here is your customers list" />
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
            rows={customerTable}
            columns={columns}
            getRowId={(row) => row.userId}
          />
        }
      </Box>
    </Box>
  );
};

export default Customers;
