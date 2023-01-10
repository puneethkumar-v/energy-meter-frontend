import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useState, useEffect } from "react";
import { mockDataTeam } from "../data/mockData";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import ErrorIcon from "@mui/icons-material/Error";

// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

const SensorsList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);
  const [arr, setArr] = useState([]);
  const [customerTable, setCustomerTable] = useState([]);
  const [assignedDevices, setAssignedDevices] = useState([]);
  const [role, setRole] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [allDevices, setAllDevices] = useState([]);
  const [deviceId, setDeviceId] = useState("");
  const [sensorsOfDevice, setSensorsOfDevice] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:650px)");


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



  const getAllDevices = async () => {
    try {
      const { data } = await API.get("/device/get-all-devices");
      // console.log(data);
      setAllDevices(data);

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getSensorsOfDevice = async(values) => {
    try {
        const {data} = await API.post("/sensorMaster/get-sensors-of-device", values)
        console.log(data);
        console.log(values);
        setSensorsOfDevice(data);

    } catch(err) {
        console.log(err);
        setError(err.message);
    }
  }

  useEffect(() => {
    getAllDevices();
  }, [deviceId]);


  const handleFormSubmit = async (values, { resetForm }) => {
    // console.log(values);
    // dispatch(adminregister(values));
    try {
        setLoading(true);
        console.log(values);
        getSensorsOfDevice(values);
        resetForm({values: initialValues})
        setLoading(false);
    } catch (err) {
        console.log(err);
        setError(err.message);
    }
};

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
        field: "sensor_id",
        headerName: "Sensor Id",
        flex: 1,
        // type: "number",
        // headerAlign: "left",
        // align: "left",
      },
      {
        field: "sensor_idx",
        headerName: "Sensor IdX",
        flex: 1,
        // type: "number",
        // headerAlign: "left",
        // align: "left",
      },
      {
        field: "sensor_name",
        headerName: "Sensor Name",
        flex: 1,
        // type: "number",
        // headerAlign: "left",
        // align: "left",
      },
      {
        field: "sensor_report_group",
        headerName: "Sensor Type",
        flex: 1,
        // type: "number",
        // headerAlign: "left",
        // align: "left",
      },
      {
        field: "sensor_uom",
        headerName: "Sensor Unit",
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


<Formik
					onSubmit={handleFormSubmit}
					initialValues={initialValues}
					validationSchema={checkoutSchema}
				>
					{({
						values,
						errors,
						touched,
						handleBlur,
						handleChange,
						handleSubmit,
					}) => (
						<form
							onSubmit={handleSubmit}
	
						>

							{error && (
                <Box
                  mb="1rem"
                  sx={{
                    color: "#e87c03",
                    display: "flex",
                    // justifyContent: "center",
                    gap: "0.5rem",
                    alignItems: "center",
                    borderRadius: "5px",
                  }}
                  p=".5rem"
                >
                  <ErrorIcon />
                  {error}
                </Box>
              )}
							<Box
								// placeItems="center"
								color={colors.grey[100]}
								gap="30px"
                                mb="2rem"
								gridTemplateColumns="repeat(4, minmax(0, 1fr))"
								sx={{
                                    display: "flex",
									"& > div": {
										gridColumn: isNonMobile
											? undefined
											: "span 4",
									},
								}}
							>
								<div
									style={{
										gridColumn: "span 4",
										width: "50%",
									}}
								>
									<InputLabel id="device_id">Device ID</InputLabel>
									<Select
										fullWidth
										variant="filled"
										// type="text"
										label="Device ID"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.device_id}
										name="device_id"
										labelId="device"
										id="device_id"
										error={
											!!touched.device_id &&
											!!errors.device_id
										}
										helperText={
											touched.device_id && errors.device_id
										}
										sx={{ gridColumn: "span 4" }}
									>
										{allDevices.map((device, id) => (
											<MenuItem value={device.device_id} key={id}>
												{device.device_id}
											</MenuItem>
										))}
									</Select>
								</div>
							<Box
								display="flex"
								justifyContent="center"
								alignItems="center"
								mt="20px"
							>
								{loading ? (
									<CircularProgress />
								) : (
									<Button
										type="submit"
										color="secondary"
										variant="contained"
										sx={{
											padding: isNonMobile
												? "10px 20px"
												: null,
											width: "100%",
											fontSize: isNonMobile
												? "16px"
												: null,
											letterSpacing: "0.15rem",
											fontWeight: "bold",
										}}
									>
										CHECK SENSORS
									</Button>
								)}
							</Box>
                            </Box>
						</form>
                    )}
				</Formik>

            <DataGrid
                checkboxSelection
                rows={sensorsOfDevice}
                columns={columns}
                getRowId={(row) => row.sensor_id}
            />
      </Box>
    </Box>
 );
};


const checkoutSchema = yup.object().shape({
    device_id: yup.string().required("required"),
});
const initialValues = {
    "device_id": "",
};

export default SensorsList;