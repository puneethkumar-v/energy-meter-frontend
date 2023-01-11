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

const API = axios.create({ baseURL: process.env.REACT_APP_API });

const SensorMaster = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:650px)");

  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialValues);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [allDevices, setAllDevices] = useState([]);
  const [admin, setIsAdmin] = useState(false);
  const [allSensorTypes, setAllSensorTypes] = useState([]);
  // const user = JSON.parse(localStorage.getItem("profile"));
  const colors = tokens(theme.palette.mode);

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
      setAllSensorTypes(data);
    } catch (err) {
      console.log(err);
    }
  };
  const getAllDevices = async () => {
    try {
      const { data } = await API.get("/device/get-all-devices");
      console.log(data);
      setAllDevices(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllDevices();

    getAllSensorTypes();
  }, []);
  const handleFormSubmit = async (values, { resetForm }) => {
    // console.log(values);
    // dispatch(adminregister(values));
    // try {
    //   setLoading(true);
    //   console.log(values);
    //   const { data } = await API.post("/sensorMaster/add", values);
    //   resetForm({ values: initialValues });
    //   setLoading(false);
    // } catch (err) {
    //   console.log(err);
    //   setError(err.message);
    // }
    console.log(values);
    let arrayOfUniqueSensors = [];
    for (let i = 0; i < values.numbers.length; i++) {
      for (let j = 0; j < allSensorTypes.length; j++) {
        if (allSensorTypes[j].sensor_name === values.numbers[i]) {
          arrayOfUniqueSensors.push(allSensorTypes[j]);
        }
      }
    }
    try {
      setLoading(true);
      arrayOfUniqueSensors.map(async (sensor) => {
        const { data } = await API.post("/sensorMaster/add", {
          device_id: values.device_id,
          sensor_idx: sensor.sensor_idx,
          sensor_name: sensor.sensor_name,
          sensor_uom: sensor.sensor_uom,
          sensor_report_group: sensor.sensor_report_group,
        });
      });

      resetForm({ values: initialValues });
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
                {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              /> */}
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
                <div style={{ width: "100%" }}>
                  <FormGroup fullWidth>
                    {allSensorTypes.map((opt) => (
                      <Field
                        fullWidth
                        type="checkbox"
                        component={CheckboxWithLabel}
                        name="numbers"
                        key={opt.sensor_name}
                        value={opt.sensor_name}
                        Label={{ label: opt.sensor_name }}
                      />
                    ))}
                  </FormGroup>
                </div>
                {/* <Checkbox
                  value={values.val}
                  name="val"
                  id="val"
                  onChange={(e) => e.target.checked}
                  onBlur={handleBlur}
                  error={!!touched.val && !!errors.val}
                  helperText={touched.val && errors.val}
                /> */}
                {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              /> */}
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
