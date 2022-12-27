import React from "react";
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
import Topbar from "./Topbar";
import { tokens } from "../theme";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { adminregister, customerregister } from "../actions/auth";
import axios from "axios";
import Header from "./Header.js";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@material-ui/core/CircularProgress";

const AssignDeviceForm = () => {
  const [tenants, setTenants] = useState([]);
  const [devices, setDevices] = useState([]);

  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:650px)");

  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState(
    JSON.parse(localStorage.getItem("profile")).userId
  );
  // const user = JSON.parse(localStorage.getItem("profile"));
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

  API.post("/tenant/get", customerId)
    .then(({ data }) => {
      console.log(data);
    })
    .catch((err) => console.log(err));

  const handleFormSubmit = async (values) => {
    // console.log(values);
    // dispatch(adminregister(values));
    // try {
    // 	setLoading(true);
    // 	const { data } = await API.post("auth/register-customer", values);
    // 	// console.log(adminRegister);
    // 	setFormData(data);
    // 	// localStorage.setItem("profiles", JSON.stringify(formData));
    // 	const emailConfirmation = await API.post(
    // 		"/auth/send-confirmation-email",
    // 		{
    // 			userId: data.userId,
    // 		}
    // 	);
    // 	setLoading(false);
    // 	if (emailConfirmation.status == 200) {
    // 		console.log("Done");
    // 	}
    // } catch (err) {
    // 	console.log(err);
    console.log(values);
    // }
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
                HERE GOES THE FORM
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
