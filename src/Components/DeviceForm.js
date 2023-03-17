import react from "react";
import Header from "./Header.js";
import { Box, useTheme, Typography, TextField, Button } from "@mui/material";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import * as yup from "yup";
import { useState } from "react";
import { Formik } from "formik";
import { tokens } from "../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ErrorIcon from "@mui/icons-material/Error";

const DeviceForm = () => {
  const [topics, setTopics] = useState([]);
  const [customers, setCustomers] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [error, setError] = useState("");
  const isNonMobile = useMediaQuery("(min-width:650px)");
  const [loading, setLoading] = useState(false);
  const API = axios.create({ baseURL: process.env.REACT_APP_API });
  API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).accessToken
      }`;
    }

    return req;
  });

  API.get("/tenant/get-all", { headers: {} })
    .then(({ data }) => {
      setCustomers(data);
    })
    .catch((err) => console.log(err));
  API.get("/device/getTopics", {
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
      setTopics(data);
    })
    .catch((err) => console.log(err));
  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const { data } = await API.post("/device/add", values);
      // console.log(adminRegister);
      // localStorage.setItem("profiles", JSON.stringify(data));
      resetForm({ values: initialValues });
      console.log(data);
      setLoading(false);
      alert("SuccessFully added a device");
    } catch (err) {
      console.log(err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Box m="20px">
      <Header title="ADD DEVICE" subtitle="Add a new Device for the Customer" />
      {/* // {topics.map((topic) => topic.topic)} */}
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
                DEVICE DETAILS
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
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Device ID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.device_id}
                  name="device_id"
                  error={!!touched.device_id && !!errors.device_id}
                  helperText={touched.device_id && errors.device_id}
                  sx={{ gridColumn: "span 4" }}
                />
                <div
                  style={{
                    gridColumn: "span 4",
                    width: "100%",
                  }}
                >
                  <InputLabel id="user_id">Tenant</InputLabel>
                  <Select
                    fullWidth
                    variant="filled"
                    // type="text"
                    label="User ID"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.user_id}
                    name="user_id"
                    labelId="User"
                    id="user_id"
                    error={!!touched.user_id && !!errors.user_id}
                    helperText={touched.user_id && errors.user_id}
                    sx={{ gridColumn: "span 4" }}
                  >
                    {customers.map((customer, id) => (
                      <MenuItem value={customer.userId} key={id}>
                        {customer.firstName}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Clinet Topic"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.client_topic}
                  name="client_topic"
                  error={!!touched.client_topic && !!errors.client_topic}
                  helperText={touched.client_topic && errors.client_topic}
                  sx={{ gridColumn: "span 4" }}
                />
                {/* <div
									style={{
										gridColumn: "span 4",
										width: "100%",
									}}
								>
									<InputLabel id="client_topic">Client Topic</InputLabel>
									<Select
										fullWidth
										variant="filled"
										// type="text"
										label="Client Topic"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.client_topic}
										name="client_topic"
										labelId="Client Topic"
										id="client_topic"
										error={
											!!touched.client_topic &&
											!!errors.client_topic
										}
										helperText={
											touched.client_topic && errors.client_topic
										}
										sx={{ gridColumn: "span 4" }}
									>
										{topics.map((topic, id) => (
											<MenuItem value={topic.topic} key={id}>
												{topic.topic}
											</MenuItem>
										))}
									</Select>
								</div> */}
                {/* <TextField
									fullWidth
									variant="filled"
									type="text"
									label="Client Topic"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.client_topic}
									name="client_topic"
									error={
										!!touched.client_topic &&
										!!errors.client_topic
									}
									helperText={
										touched.client_topic && errors.client_topic
									}
									sx={{ gridColumn: "span 4" }}
								/> */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Variant"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.variant}
                  name="variant"
                  error={!!touched.variant && !!errors.variant}
                  helperText={touched.variant && errors.variant}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="hw_ver"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.hw_ver}
                  name="hw_ver"
                  error={!!touched.hw_ver && !!errors.hw_ver}
                  helperText={touched.hw_ver && errors.hw_ver}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="fw_ver"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fw_ver}
                  name="fw_ver"
                  error={!!touched.fw_ver && !!errors.fw_ver}
                  helperText={touched.fw_ver && errors.fw_ver}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="o_logo"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.o_logo}
                  name="o_logo"
                  error={!!touched.o_logo && !!errors.o_logo}
                  helperText={touched.o_logo && errors.o_logo}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="o_prod_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.o_prod_name}
                  name="o_prod_name"
                  error={!!touched.o_prod_name && !!errors.o_prod_name}
                  helperText={touched.o_prod_name && errors.o_prod_name}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="o_prod_ver"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.o_prod_ver}
                  name="o_prod_ver"
                  error={!!touched.o_prod_ver && !!errors.o_prod_ver}
                  helperText={touched.o_prod_ver && errors.o_prod_ver}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="u_dev_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.u_dev_name}
                  name="u_dev_name"
                  error={!!touched.u_dev_name && !!errors.u_dev_name}
                  helperText={touched.u_dev_name && errors.u_dev_name}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="u_comp_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.u_comp_name}
                  name="u_comp_name"
                  error={!!touched.u_comp_name && !!errors.u_comp_name}
                  helperText={touched.u_comp_name && errors.u_comp_name}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="u_tz_diff"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.u_tz_diff}
                  name="u_tz_diff"
                  error={!!touched.u_tz_diff && !!errors.u_tz_diff}
                  helperText={touched.u_tz_diff && errors.u_tz_diff}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="u_lat"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.u_lat}
                  name="u_lat"
                  error={!!touched.u_lat && !!errors.u_lat}
                  helperText={touched.u_lat && errors.u_lat}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="u_long"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.u_long}
                  name="u_long"
                  error={!!touched.u_long && !!errors.u_long}
                  helperText={touched.u_long && errors.u_long}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="u_conn_ssid"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.u_conn_ssid}
                  name="u_conn_ssid"
                  error={!!touched.u_conn_ssid && !!errors.u_conn_ssid}
                  helperText={touched.u_conn_ssid && errors.u_conn_ssid}
                  sx={{ gridColumn: "span 2" }}
                />
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
                    ADD DEVICE
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
  user_id: yup.string().required("required"),
  client_topic: yup.string().required("required"),
  variant: yup.string().required("required"),
  hw_ver: yup.string().required("required"),
  fw_ver: yup.string().required("required"),
  o_logo: yup.string().required("required"),
  o_prod_name: yup.string().required("required"),
  o_prod_ver: yup.string().required("required"),
  u_dev_name: yup.string().required("required"),
  u_comp_name: yup.string().required("required"),
  u_tz_diff: yup.string().required("required"),
  u_lat: yup.string().required("required"),
  u_long: yup.string().required("required"),
  u_conn_ssid: yup.string().required("required"),
});

const initialValues = {
  device_id: "",
  user_id: "",
  client_topic: "",
  variant: "1",
  hw_ver: "1",
  fw_ver: "1",
  o_logo: "1",
  o_prod_name: "1",
  o_prod_ver: "1",
  u_dev_name: "1",
  u_comp_name: "1",
  u_tz_diff: "1",
  u_lat: "1",
  u_long: "1",
  u_conn_ssid: "",
};

export default DeviceForm;
