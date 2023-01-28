import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Checkbox,
  Typography,
  FormGroup,
  useTheme,
  FormControlLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import ErrorIcon from "@mui/icons-material/Error";
import { Field, Formik } from "formik";
import * as yup from "yup";
import React, { useEffect } from "react";
import Topbar from "./Topbar";
import { tokens } from "../theme";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { adminregister, customerregister } from "../actions/auth";
import axios, { all } from "axios";
import Header from "./Header.js";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CheckboxWithLabel } from "formik-material-ui";
import { MultiSelect } from "react-multi-select-component";

const API = axios.create({ baseURL: process.env.REACT_APP_API });

const SensorMaster = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:650px)");
  let arr = [];
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialValues);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [allDevices, setAllDevices] = useState([]);
  const [admin, setIsAdmin] = useState(false);
  const [allSensorTypes, setAllSensorTypes] = useState([]);
  // const user = JSON.parse(localStorage.getItem("profile"));
  const colors = tokens(theme.palette.mode);

  const options = [
    {
      label: "Frequency",
      value: {
        name: "PK",
        age: 22,
      },
    },
    {
      label: "Volume",
      value: {
        name: "KP",
        age: 22,
      },
    },
    {
      label: "SOmehi",
      value: {
        name: "RP",
        age: 22,
      },
    },
  ];

  const [selected, setSelected] = useState([]);
  // setSelected(initialValues.numbers.push(selected))
  // selected.map((sensor) => console.log(sensor.value));

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

  const getAllSensorTypes = async () => {
    try {
      const { data } = await API.get("/sensorType/get");
      // setAllSensorTypes(data);
      // console.log("sensorTypes", data[0].sensor_name);

      // data.map((sensor) => {
      //   setAllSensorTypes(...allSensorTypes, {
      //     label: sensor.sensor_name,
      //     value: {
      //       sensor_idx: sensor.sensor_idx,
      //       sensor_uom: sensor.sensor_uom,
      //       sensor_name: sensor.sensor_name,
      //       sensor_report_group: sensor.sensor_report_group,
      //     },
      //   });
      // });
      let tempArray = [];
      for (let i = 0; i < data.length; i++) {
        const getAllData = {
          label: `${data[i].sensor_name}`,
          value: {
            sensor_idx: `${data[i].sensor_idx}`,
            sensor_uom: `${data[i].sensor_uom}`,
            sensor_name: `${data[i].sensor_name}`,
            sensor_report_group: `${data[i].sensor_report_group}`,
          },
        };
        tempArray.push(getAllData);
      }
      setAllSensorTypes(tempArray);
      // console.log(allSensorTypes);
    } catch (err) {
      console.log(err);
    }
  };
  const getAllDevices = async () => {
    try {
      const { data } = await API.get("/device/get-all-devices");
      // console.log(data);
      setAllDevices(data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllDevices();

    getAllSensorTypes();
  }, []);
  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      // arrayOfUniqueSensors.map(async (sensor) => {
      //   const { data } = await API.post("/sensorMaster/add", {
      //     device_id: values.device_id,
      //     sensor_idx: sensor.sensor_idx,
      //     sensor_name: sensor.sensor_name,
      //     sensor_uom: sensor.sensor_uom,
      //     sensor_report_group: sensor.sensor_report_group,
      //   });
      // });
      selected.map(async (val) => {
        let actualValue = {
          device_id: values.device_id,
          sensor_idx: val.value.sensor_idx,
          sensor_name: val.value.sensor_name,
          sensor_uom: val.value.sensor_uom,
          sensor_report_group: val.value.sensor_report_group,
        };
        const { data } = await API.post("/sensorMaster/add", actualValue);
        console.log(data);
      });
      resetForm({ values: initialValues });
      setSelected([]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  // const options = [
  //   {
  //     label: "Uno",
  //     value: "one",
  //   },
  //   {
  //     label: "Dos",
  //     value: "two",
  //   },
  //   {
  //     label: "Tres",
  //     value: "three",
  //   },
  // ];

  return (
    <Box m="20px" sx={{ height: isNonMobile ? "90vh" : "100%" }}>
      <Header
        title="Add Sensors"
        subtitle="Fill up the form with the Sensors list"
      />
      <Box
        m="20px"
        sx={{
          height: isNonMobile ? "80vh" : "100%",
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
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
              style={{
                width: "100%",
                // boxShadow: "7px 7px 9px 0px rgba(0,0,0,0.47)",
                boxShadow: isNonMobile
                  ? "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)"
                  : null,
                maxWidth: "40rem",
                color: colors.grey[100],
                margin: "0 auto",
                padding: isNonMobile ? "2rem" : null,
                borderRadius: "6px",
                background: isNonMobile ? colors.primary[400] : null,
                // display: "grid",
                // placeItems: "center",
                // height: "100%",
              }}
            >
              <Typography
                variant={isNonMobile ? "h3" : "h4"}
                color={colors.grey[100]}
                fontWeight="bold"
                mb="2rem"
              >
                SENSORS DETAILS
              </Typography>
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
                // display="grid"
                // placeItems="center"
                color={colors.grey[100]}
                // gap="30px"
                // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <div
                  style={{
                    // gridColumn: "span 4",
                    width: "100%",
                  }}
                >
                  <InputLabel id="device_id">Device ID</InputLabel>
                  <Select
                    fullWidth
                    variant="filled"
                    label="Device xID"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.device_id}
                    name="device_id"
                    labelId="device"
                    id="device_id"
                    error={!!touched.device_id && !!errors.device_id}
                    helperText={touched.device_id && errors.device_id}
                    // sx={{ gridColumn: "span 4" }}
                  >
                    {allDevices.map((device, id) => (
                      <MenuItem value={device.device_id} key={id}>
                        {device.device_id}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <div>
                  <InputLabel id="sensor_list" sx={{ marginTop: "1.2rem" }}>
                    Sensors List
                  </InputLabel>
                  <MultiSelect
                    options={allSensorTypes}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                  />
                </div>
              </Box>
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
                      padding: isNonMobile ? "10px 20px" : null,
                      width: "100%",
                      fontSize: isNonMobile ? "16px" : null,
                      letterSpacing: "0.15rem",
                      fontWeight: "bold",
                    }}
                  >
                    ADD SENSOR
                  </Button>
                )}
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  device_id: yup.string().required("required"),
  numbers: yup.array(),
});
const initialValues = {
  device_id: "",
  numbers: [],
};

export default SensorMaster;
