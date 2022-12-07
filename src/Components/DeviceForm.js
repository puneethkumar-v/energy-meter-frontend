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

const DeviceForm = () => {
	const [topics, setTopics] = useState([]);
	const [customers, setCustomers] = useState([]);
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
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

	API.get("/customer/get-all", { headers: {} })
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
	const handleFormSubmit = (values) => {
		console.log(values);
	};

	return (
		<Box m="20px">
			<Header
				title="ADD DEVICE"
				subtitle="Add a new Device for the Customer"
			/>
			// {topics.map((topic) => topic.topic)}
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
								background: isNonMobile
									? colors.primary[400]
									: null,
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
							<Box
								display="grid"
								// placeItems="center"
								color={colors.grey[100]}
								gap="30px"
								gridTemplateColumns="repeat(4, minmax(0, 1fr))"
								sx={{
									"& > div": {
										gridColumn: isNonMobile
											? undefined
											: "span 4",
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
									error={
										!!touched.device_id &&
										!!errors.device_id
									}
									helperText={
										touched.device_id && errors.device_id
									}
									sx={{ gridColumn: "span 4" }}
								/>
								<div style={{ gridColumn: "span 4" }}>
									<InputLabel id="user">User</InputLabel>
									<Select
										labelId="User"
										id="user"
										// value={graphType}
										onChange={(e) => e.target.value}
									>
										{customers.map((customer) => (
											<MenuItem value={customer.userId}>
												{customer.firstName}
											</MenuItem>
										))}
									</Select>
								</div>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="First Name"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.firstName}
									name="firstName"
									error={
										!!touched.firstName &&
										!!errors.firstName
									}
									helperText={
										touched.firstName && errors.firstName
									}
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
									error={
										!!touched.lastName && !!errors.lastName
									}
									helperText={
										touched.lastName && errors.lastName
									}
									sx={{ gridColumn: "span 2" }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="Country"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.country}
									name="country"
									error={
										!!touched.country && !!errors.country
									}
									helperText={
										touched.country && errors.country
									}
									sx={{ gridColumn: "span 2" }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="State"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.state}
									name="state"
									error={!!touched.state && !!errors.state}
									helperText={touched.state && errors.state}
									sx={{ gridColumn: "span 2" }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="City"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.city}
									name="city"
									error={!!touched.city && !!errors.city}
									helperText={touched.city && errors.city}
									sx={{ gridColumn: "span 2" }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="Zip"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.zip}
									name="zip"
									error={!!touched.zip && !!errors.zip}
									helperText={touched.zip && errors.zip}
									sx={{ gridColumn: "span 2" }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="textarea"
									label="Address"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.address}
									name="address"
									error={
										!!touched.address && !!errors.address
									}
									helperText={
										touched.address && errors.address
									}
									sx={{ gridColumn: "span 4" }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="tel"
									label="contact_number"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.contact_number}
									name="contact_number"
									error={
										!!touched.contact_number &&
										!!errors.contact_number
									}
									helperText={
										touched.contact_number &&
										errors.contact_number
									}
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
									error={
										!!touched.password && !!errors.password
									}
									helperText={
										touched.password && errors.password
									}
									sx={{ gridColumn: "span 4" }}
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
										ADD CUSTOMER
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
	variant: "",
	hw_ver: "",
	fw_ver: "",
	o_logo: "",
	o_prod_name: "",
	o_prod_ver: "",
	u_dev_name: "",
	u_comp_name: "",
	u_tz_diff: "",
	u_lat: "",
	u_long: "",
	u_conn_ssid: "",
};

export default DeviceForm;
