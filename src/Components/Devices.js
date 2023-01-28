import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useState, useEffect } from "react";
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
  const [customerTable, setCustomerTable] = useState([]);
  const [assignedDevices, setAssignedDevices] = useState([]);
  const [role, setRole] = useState("");
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

  const getRole = async () => {
    const { data } = await API.get("/auth/my-role");
    setRole(data.role);
  };

  const getMyDevices = async () => {
    try {
      const { data } = await API.get("/device/get-my-devices");
      setCustomerTable(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAssignedDevices = async () => {
    try {
      const { data } = await API.get("/tenant/get-assigned-devices");
      setAssignedDevices(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllDevices = async () => {
    try {
      const { data } = await API.get("/device/get-all-devices");
      // console.log(data);
      setArr(data);

      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRole();
  }, []);

  useEffect(() => {
    // isAdmin ? getAllDevices() : getMyDevices();

    if (role === "TENANT") getAssignedDevices();
    if (role === "ADMIN") getAllDevices();
    if (role === "CUSTOMER") getMyDevices();
  }, [role]);

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
      headerName: "Client Topic",
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
      renderCell: ({ row: { access }, id }) => {
        // renderCell: (index) => {
        // const currentIndex = api.getRowIndex(id);
        const deviceId = id;
        let currentDevice = {};

        if (role === "ADMIN") {
          currentDevice = arr.filter(
            (device) => device.device_id === deviceId
          )[0];
        }

        if (role === "CUSTOMER") {
          currentDevice = customerTable.filter(
            (device) => device.device_id === deviceId
          )[0];
        }
        if (role === "TENANT") {
          currentDevice = assignedDevices.filter(
            (device) => device.device_id === deviceId
          )[0];
        }

        // console.log(currentDevice);
        // console.log({ currentDevice });
        // const currentIndex = index.api.getRowIndex(index.row.id);

        // console.log(currentIndex + 1);
        // return <h1>hi</h1>;

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
          <>
            {/* {console.log("currentDevice", currentDevice)} */}
            <Link
              to={currentDevice.device_id}
              style={{ textDecoration: "none" }}
            >
              <Button color="secondary" variant="contained">
                Monitor Sensors
              </Button>
            </Link>
          </>
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
        {role === "ADMIN" && (
          <DataGrid
            checkboxSelection
            rows={arr}
            columns={columns}
            getRowId={(row) => row.device_id}
          />
        )}
        {role === "CUSTOMER" && (
          <DataGrid
            checkboxSelection
            rows={customerTable}
            columns={columns}
            getRowId={(row) => row.device_id}
          />
        )}
        {role === "TENANT" && (
          <DataGrid
            checkboxSelection
            rows={assignedDevices}
            columns={columns}
            getRowId={(row) => row.device_id}
          />
        )}
      </Box>
    </Box>
  );
};

export default Devices;
