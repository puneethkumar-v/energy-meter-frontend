import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useState } from "react";
import { mockDataTeam } from "../data/mockData";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

const Devices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [arr, setArr] = useState([]);
  // arr.push({ a: "a" });
  // console.log(arr);
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
  API.get("/device/get-all-devices", {
    headers: {},
  })
    .then(({ data }) => {
      // data.forEach((device) =>
      //   arr.push({
      //     // setCount((count) => count + 1),
      //     // device.device_id,
      //     // device.client_topic,
      //     // device.user.firstName,
      //     a: "a",
      //     b: "b",
      //     c: "c",
      //   })
      // );
      // let user = data[0].user.lastName;
      setArr(data);
    })
    .catch((err) => console.log(err));
  // console.log(arr);

  const columns = [
    // { field: "sl_no", headerName: "SL. NO" },
    { field: "device_id", headerName: "Device ID", flex: 1 },
    // {
    //   field: "user",
    //   headerName: "User Name",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
    {
      field: "client_topic",
      headerName: "Clinet Topic",
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
    {
      field: "accessLevel",
      headerName: "Details",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          // <Box
          //   width="40%"
          //   cursor="pointer"
          //   // height="70px"
          //   // m=" auto"
          //   p="5px"
          //   display="flex"
          //   justifyContent="center"
          //   backgroundColor={
          //     access === "admin"
          //       ? colors.greenAccent[600]
          //       : access === "manager"
          //       ? colors.greenAccent[700]
          //       : colors.greenAccent[700]
          //   }
          //   borderRadius="4px">
          //   {/* {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
          //   {access === "manager" && <SecurityOutlinedIcon />}
          //   {access === "user" && <LockOpenOutlinedIcon />} */}
          //   {/* <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
          //     Open
          //   </Typography> */}
          //   <Button variant="contained">Open</Button>
          // </Box>
          <Link to="/values" style={{ textDecoration: "none" }}>
            <Button
              color="secondary"
              variant="contained"
              // width="40%"
              // color={colors.greenAccent[600]}
            >
              Monitor Sensors
            </Button>
          </Link>
        );
      },
    },
  ];
  return (
    <Box m="20px">
      <Header title="DEVICES" subtitle="Here is your device list" />
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
        <DataGrid
          checkboxSelection
          rows={arr}
          columns={columns}
          getRowId={(row) => row.device_id}
        />
      </Box>
    </Box>
  );
};

export default Devices;
