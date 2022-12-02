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
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { adminregister, customerregister } from "../actions/auth";
import axios from "axios";
import Header from "./Header.js";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const API = axios.create({ baseURL: process.env.REACT_APP_API });

const CustomerForm = () => {
	const theme = useTheme();
	const isNonMobile = useMediaQuery("(min-width:650px)");

	const dispatch = useDispatch();
	const [formData, setFormData] = useState(initialValues);
	const navigate = useNavigate();
	// const user = JSON.parse(localStorage.getItem("profile"));
	const colors = tokens(theme.palette.mode);
	const handleFormSubmit = async (values) => {
		// console.log(values);
		// dispatch(adminregister(values));
		try {
			const { data } = await API.post("auth/register-customer", values);
			// console.log(adminRegister);
			setFormData(data);
			// localStorage.setItem("profiles", JSON.stringify(formData));
			const emailConfirmation = await API.post(
				"/auth/send-confirmation-email",
				{
					userId: data.userId,
				}
			);
			if (emailConfirmation.status == 200) {
				console.log("Done");
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Box m="20px" sx={{ height: "90vh" }}>
			<Header
				title="ADD CUSTOMER"
				subtitle="Fill up the form with the Customer details"
			/>
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
								type="email"
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
								error={!!touched.country && !!errors.country}
								helperText={touched.country && errors.country}
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
								error={!!touched.address && !!errors.address}
								helperText={touched.address && errors.address}
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
								error={!!touched.contact_number && !!errors.contact_number}
								helperText={touched.contact_number && errors.contact_number}
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
								Create New User
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	);
};

const phoneRegExp =
	/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
	email: yup.string().email("invalid email").required("required"),
	firstName: yup.string().required("required"),
	lastName: yup.string().required("required"),
	country: yup.string().required("required"),
	state: yup.string().required("required"),
	city: yup.string().required("required"),
	zip: yup.string().required("required"),
	address: yup.string().required("required"),
	contact_number: yup
		.string()
		.matches(phoneRegExp, "Phone number is not valid")
		.required("required"),
	password: yup.string().required("required"),
});
const initialValues = {
	email: "",
	firstName: "",
	lastName: "",
	country: "",
	state: "",
	city: "",
	zip: "",
	address: "",
	contact_number: "",
	password: "",
};

export default CustomerForm;
