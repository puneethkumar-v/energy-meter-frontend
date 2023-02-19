import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
  useTheme,
  MenuItem,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { Box } from "@mui/system";
import { Formik } from "formik";
import * as yup from "yup";
import Topbar from "./Topbar";
import { tokens } from "../theme";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { adminregister, customerregister } from "../actions/auth";
import axios from "axios";
import Header from "./Header.js";
import { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@material-ui/core/CircularProgress";

const AssignDeviceForm = () => {
  // const [devices, setDevices] = useState([]);
  const [devices, setDevices] = useState([]);

  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:650px)");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const [customerId, setCustomerId] = useState();
  // console.log(customerId);
  // const user = JSON.parse(localStorage.getItem("profile"));
  const [tenants, setTenants] = useState([]);
  const colors = tokens(theme.palette.mode);
  // console.log(customerId);

  const API = axios.create({ baseURL: process.env.REACT_APP_API });
  API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).accessToken
      }`;
    }

    return req;
  });

  const getTenants = async () => {
    const result = await API.get("/profile/me");
    console.log("data", result.data.userId);
    const { data } = await API.post("/tenant/get-by-customer-id", {
      customerId: result.data.userId,
    });
    console.log(data);
    setTenants(data);
  };

  const assignDeviceToTenant = async (values) => {
    const { data } = await API.post("/customer/deviceTenants/add", {
      deviceId: values.device_id,
      tenantId: values.tenant_id,
    });
    return data;
  };

  const getMyDevices = async () => {
    const { data } = await API.get("/device/get-my-devices");
    // devices = await data;
    // console.log("data", data);
    setDevices(data);
    // console.log(data);
  };
  useEffect(() => {
    getTenants();
  }, []);
  useEffect(() => {
    getMyDevices();
  }, []);

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const { data } = await assignDeviceToTenant(values);
      resetForm({ values: initialValues });
    } catch (err) {
      console.log(err);
      setError(err.message);
      resetForm({ values: initialValues });
    }
  };

  return (
    <Box m="20px" sx={{ height: isNonMobile ? "90vh" : "100%" }}>
      <Header
        title="ADD CUSTOMER"
        subtitle="Fill up the form with the Customer details"
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
                ASSIGN DEVICE
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
                display="grid"
                // placeItems="center"
                color={colors.grey[100]}
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <div
                  style={{
                    gridColumn: "span 4",
                    width: "100%",
                  }}
                >
                  <InputLabel id="tenantId">Customers</InputLabel>
                  <Select
                    fullWidth
                    variant="filled"
                    // type="text"
                    label="Tenants ID"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.tenant_id}
                    name="tenant_id"
                    labelId="Tenant"
                    id="tenant_id"
                    error={!!touched.tenant_id && !!errors.tenant_id}
                    helperText={touched.tenant_id && errors.tenant_id}
                    sx={{ gridColumn: "span 4" }}
                  >
                    {tenants.map((tenant, id) => (
                      <MenuItem value={tenant.userId} key={id}>
                        {tenant.firstName}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div
                  style={{
                    gridColumn: "span 4",
                    width: "100%",
                  }}
                >
                  <InputLabel id="device_id">Devices</InputLabel>
                  <Select
                    fullWidth
                    variant="filled"
                    // type="text"
                    label="Tenants ID"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.device_id}
                    name="device_id"
                    labelId="Tenant"
                    id="device_id"
                    error={!!touched.device_id && !!errors.device_id}
                    helperText={touched.device_id && errors.device_id}
                    sx={{ gridColumn: "span 4" }}
                  >
                    {devices.map((device, id) => (
                      <MenuItem value={device.device_id} key={id}>
                        {device.device_id}
                      </MenuItem>
                    ))}
                  </Select>
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
                    ASSIGN
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
  tenant_id: yup.string().required("required"),
});
const initialValues = {
  device_id: "",
  tenant_id: "",
};

export default AssignDeviceForm;
