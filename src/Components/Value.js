import { Card, ColGrid, Flex, Metric, Text } from "@tremor/react";
import ElectricMeterIcon from "@mui/icons-material/ElectricMeter";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { Icon } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import axios from "axios";
import { useEffect, useState } from "react";

import "../../src/index.css";

const categories = [
  {
    title: "Devices",
    metric: "1",
    color: "indigo",
    icon: <ElectricMeterIcon />,
  },
  {
    title: "Customers",
    metric: "3",
    color: "fuchsia",
    icon: <SupportAgentIcon />,
  },
  {
    title: "Tenants",
    metric: "6",
    color: "amber",
    icon: <SupervisedUserCircleIcon />,
  },
];

export default function Value() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [deviceCount, setDeviceCount] = useState("");
  const [tenantCount, setTenantCount] = useState("");
  const [customerCount, setCustomerCount] = useState("");

  const API = axios.create({ baseURL: process.env.REACT_APP_API });

  API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).accessToken
      }`;
    }

    return req;
  });

  const fetchAllData = async () => {
    try {
      const tenantDetails = await API.get("/tenant/get-all");
      setTenantCount(tenantDetails.data.length);
      console.log("tenant", tenantDetails.data.length);

      const customerDetails = await API.get("/customer/get-all");
      setCustomerCount(customerDetails.data.length);
      console.log("customer", customerDetails.data.length);

      const deviceDetails = await API.get("/device/get-all-devices");
      console.log("device", deviceDetails.data.length);
      setDeviceCount(deviceDetails.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="dashCards">
      <div
        className="dashCard"
        style={{ backgroundColor: colors.primary[400] }}
      >
        <div className="title">Devices</div>
        <div className="body">
          <div className="icon">
            <ElectricMeterIcon fontSize="large" />
          </div>
          <div className="value">{deviceCount}</div>
        </div>
      </div>
      <div
        className="dashCard"
        style={{ backgroundColor: colors.primary[400] }}
      >
        <div className="title">Customers</div>
        <div className="body">
          <div className="icon">
            <SupportAgentIcon fontSize="large" />
          </div>
          <div className="value">{customerCount}</div>
        </div>
      </div>
      <div
        className="dashCard"
        style={{ backgroundColor: colors.primary[400] }}
      >
        <div className="title">Tenants</div>
        <div className="body">
          <div className="icon">
            <SupervisedUserCircleIcon fontSize="large" />
          </div>
          <div className="value">{tenantCount}</div>
        </div>
      </div>
    </div>
  );
}
