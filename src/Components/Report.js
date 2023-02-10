import * as React from "react";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/system";
import Header from "./Header";
import {
  Button,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { tokens } from "../theme";
import dayjs from "dayjs";
import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API });

export default function Report() {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:650px)");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const user = JSON.parse(localStorage.getItem("profile"));
  const [admin, setIsAdmin] = useState(false);
  const colors = tokens(theme.palette.mode);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

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

  const getDate = (value) => {
    let date = `${new Date(value.$d).getDate()}`;
    let hour = `${new Date(value.$d).getHours()}`;
    console.log(hour);
    if (date < 10) {
      date = `0${date}`;
    }
    let month = `${new Date(value.$d).getMonth() + 1}`;
    if (month < 10) {
      month = `0${month}`;
    }
    let year = `${new Date(value.$d).getFullYear()}`;
    return `${year}-${month}-${date}`;
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("fromDate", fromDate.$d);
    console.log("toDate", toDate);
    let obj = {
      fromDate: getDate(fromDate),
      toDate: getDate(toDate),
    };
    console.log(obj);
    try {
      const { data } = await API.post("/report/between-dates", obj, {
        responseType: "blob", // had to add this one here
      });
      console.log(data);
      window.open(URL.createObjectURL(data));
      // console.log(res);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box m="20px" sx={{ height: isNonMobile ? "90vh" : "100%" }}>
      <Header
        title="GENERATE REPORT"
        subtitle="Enter the date which you want the report"
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
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              sx={{
                minWidth: 0,
                width: "100%  !important",
                margin: "2rem",
              }}
            >
              <DatePicker
                label="From Date"
                value={fromDate}
                sx={{
                  minWidth: 0,
                  width: "100%  !important",
                  margin: "2rem",
                }}
                // minDate={dayjs("2012-03-01")}
                maxDate={dayjs(new Date())}
                onChange={(newValue) => {
                  setFromDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <br />
              <DatePicker
                label="To Date"
                sx={{
                  minWidth: 0,
                  width: "100%  !important",
                }}
                value={toDate}
                maxDate={dayjs(new Date())}
                onChange={(newValue) => {
                  setToDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
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
                  GENERATE
                </Button>
              )}
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
