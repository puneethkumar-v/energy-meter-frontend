import React, { useState, useEffect } from "react";
// import "./Livechart.css";
import ReactApexChart from "react-apexcharts";
// import moment from "moment";
// import mqtt from "mqtt";
import axios from "axios";
import { Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Livechart({ deviceid }) {
  const [sensorNames, setSensorNames] = useState([]);
  const [readingTime, setReadingTime] = useState("");
  const [x_axis, setx_axis] = useState([]);
  const [y1_axis, sety1_axis] = useState([]);
  const [sensorType, setSensorType] = useState("Frequency");
  const [graphType, setGraphType] = useState("area");
  const API = axios.create({ baseURL: process.env.REACT_APP_API });
  function get_y1_axis(y_val) {
    if (y1_axis.length < 6) {
      sety1_axis([...y1_axis, y_val]);
    } else {
      sety1_axis([...y1_axis.slice(1), y_val]);
    }
  }
  // function get_y2_axis(y_val) {
  //   if (y2_axis.length < 6) {
  //     sety2_axis([...y2_axis, y_val]);
  //   } else {
  //     sety2_axis([...y2_axis.slice(1), y_val]);
  //   }
  // }

  API.post("/sensorValue/get-unique-sensor-names", {
    deviceId: "MQI1-90-38-0C-57-58-BC",
  })
    .then(({ data }) => {
      setSensorNames(data);
      // setSensorType(() => data[0]);
    })
    .catch((err) => console.log(err));

  async function fetch_freq() {
    const { data } = await API.post("/sensorValue/get-data", {
      deviceId: "MQI1-90-38-0C-57-58-BC",
      parameter: sensorType || "Frequency",
      // parameter: "Frequency",
    });
    setReadingTime(data.reading_time);
    return data.value;
  }

  function handleChange(e) {
    setSensorType(() => e.target.value);
    // console.log(e.target.value);
    sety1_axis([]);
  }

  function handleGraphType(e) {
    setGraphType(e.target.value);
  }

  function get_x_axis(x_val) {
    if (x_axis.length < 6) {
      setx_axis([...x_axis, x_val]);
    } else {
      setx_axis([...x_axis.slice(1), x_val]);
    }
  }
  // var cnt = 0;

  // const [y2_axis, sety2_axis] = useState([]);
  const [Volt_R, setVolt_R] = useState({
    series: [
      {
        name: "Frequency",
        data: y1_axis,
      },
      // {
      //   name: "Voltage-R2",
      //   data: y2_axis,
      // },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        // animations: {
        //   enabled: true,
        //   easing: "easeinout",
        //   speed: 800,
        //   animateGradually: {
        //     enabled: true,
        //     delay: 150,
        //   },
        //   dynamicAnimation: {
        //     enabled: true,
        //     speed: 350,
        //   },
        // },
      },
      // noData: {
      //   text: "Loading...",
      //   align: "center",
      //   verticalAlign: "middle",
      //   offsetX: 0,
      //   offsetY: 0,
      //   style: {
      //     color: "#000000",
      //     fontSize: "14px",
      //     fontFamily: "Helvetica",
      //   },
      // },
      markers: {
        size: 5,
        hover: {
          size: undefined,
          sizeOffset: 3,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: x_axis,
      },
      tooltip: {
        x: {
          format: "HH:mm:ss",
        },
      },
    },
  });

  function getData1() {
    return {
      series: [
        {
          name: "Frequency",
          data: y1_axis,
        },
        // {
        //   name: "Voltage-R2",
        //   data: y2_axis,
        // },
      ],
      options: {
        chart: {
          height: 350,
          type: "area",
          animations: {
            enabled: false,
            // easing: "easeinout",
            // speed: 800,
            // dynamicAnimation: {
            //   enabled: false,
            //   speed: 350,
            // },
          },
        },
        markers: {
          size: 5,
          hover: {
            size: undefined,
            sizeOffset: 3,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: x_axis,
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy HH:mm:ss",
          },
        },
      },
    };
  }

  async function fetchGraphValue() {
    // get_x_axis(new Date(readingTime).toString());
    get_x_axis(new Date().toISOString());
    // get_y1_axis(Math.floor(Math.random() * 101).toFixed(2));
    // get_y2_axis(Math.floor(Math.random() * 101).toFixed(2));

    const graphValue = await fetch_freq();

    get_y1_axis(graphValue);
    setVolt_R((x) => getData1());
  }

  useEffect(() => {
    // fetchGraphValue();
    const interval = setInterval(fetchGraphValue, 1000);
    return () => clearInterval(interval);
  }, [Volt_R, sensorType]);

  return (
    <div className="livechart">
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="sensor-type">Sensor Type</InputLabel>
        <Select
          labelId="Sensor Type"
          id="sensor-type"
          value={sensorType}
          onChange={handleChange}>
          {sensorNames.map((sensor) => (
            <MenuItem key={sensor} value={sensor}>
              {sensor}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="graph-type">Graph Type</InputLabel>
        <Select
          labelId="Graph Type"
          id="graph-type"
          value={graphType}
          onChange={handleGraphType}>
          <MenuItem value="area">Area</MenuItem>
          <MenuItem value="line">Line</MenuItem>
          <MenuItem value="bar">Bar</MenuItem>
        </Select>
      </FormControl>
      <Typography
        variant="h5"
        m="0.5rem"
        style={{ textAlign: "left" }}
        mt="2rem"
        ml="2rem"
        mb="-1.5rem">
        {sensorType}
      </Typography>
      <br />
      <ReactApexChart
        options={Volt_R.options}
        series={Volt_R.series}
        type={graphType ? graphType : "area"}
        height={600}
        width={800}
      />
      {/* <h2>{count.value}</h2> */}
    </div>
  );
}

export default Livechart;
