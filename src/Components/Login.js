import {
  Button,
  FormControl,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import * as yup from "yup";
import React from "react";
import Topbar from "./Topbar";
import { tokens } from "../theme";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API });

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const handleFormSubmit = async (values) => {
    try {
      const { data } = await API.post("/auth/login", values);
      // console.log(data);
      API.interceptors.request.use((req) => {
        req.headers.authorization = `Bearer ${data.accessToken}`;
        // console.log(req);
        return req;
      });
      let profileData = await API.get("/profile/me", { headers: {} });
      // console.log(profileData.data, data.accessToken);
      let profile = profileData.data;
      profile["accessToken"] = data.accessToken;
      profile["refreshToken"] = data.refreshToken;
      // let obj = { profile, accessToken, refreshToken };

      localStorage.setItem("profile", JSON.stringify(profile));
      setIsActive(true);
      window.location.href = "/";
      // let profiles = JSON.parse(localStorage.getItem("profiles"));
      // if (profiles.email == values.email) {
      //   profiles.accessToken = data.accessToken;
      //   profiles.refreshToken = data.refreshToken;
      //   // let profile = {...profiles, profiles.accessToken: data.accessToken, profiles.refreshToken: data.refreshToken};
      //   localStorage.setItem("profile", JSON.stringify(profiles));
      //   window.location.href = "/";
      // }

      console.log(profile);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box m="20px" sx={{ height: "100%" }}>
      {isActive ? <Topbar /> : <Topbar login />}

      <Box m="20px" sx={{ height: "100%" }}>
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
                maxWidth: "30rem",
                margin: "0 auto",
                // display: "grid",
                // placeItems: "center",
                height: "100%",
              }}
            >
              <Typography variant="h3" color={colors.grey[100]} mb="2rem">
                Login Form
              </Typography>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                // sx={{
                //   "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                // }}
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
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
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
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Login
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});
const initialValues = {
  email: "",
  password: "",
};

export default Login;
