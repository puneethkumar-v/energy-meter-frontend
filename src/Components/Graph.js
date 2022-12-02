import { Box, useTheme } from "@mui/system";
import React from "react";
import Header from "./Header";
import useFetch from "./useFetch";
import { tokens } from "../theme";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const Graph = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, count } = useFetch(`http://192.168.0.113:5000/api/v1`);

  function get_y1_axis(y_val) {
    if (y1_axis.length < 6) {
      sety1_axis([...y1_axis, y_val]);
    } else {
      sety1_axis([...y1_axis.slice(1), y_val]);
    }
  }
  function get_y2_axis(y_val) {
    if (y2_axis.length < 6) {
      sety2_axis([...y2_axis, y_val]);
    } else {
      sety2_axis([...y2_axis.slice(1), y_val]);
    }
  }

  function get_x_axis(x_val) {
    if (x_axis.length < 6) {
      setx_axis([...x_axis, x_val]);
    } else {
      setx_axis([...x_axis.slice(1), x_val]);
    }
  }
  // var cnt = 0;
  const [x_axis, setx_axis] = useState([new Date().toISOString()]);
  const [y1_axis, sety1_axis] = useState([
    {
      Temperature: 28,
      humidity: 90,
    },
  ]);
  const [y2_axis, sety2_axis] = useState([
    {
      Temperature: 28,
      humidity: 90,
    },
  ]);
  const [Volt_R, setVolt_R] = useState({
    series: [
      {
        name: "Temperature",
        data: y1_axis,
      },
      {
        name: "humidity",
        data: y2_axis,
      },
    ],
    options: {
      //   colors: colors.greenAccent[200],
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
          name: "Temperature",
          data: y1_axis,
        },
        {
          name: "humidity",
          data: y2_axis,
        },
      ],
      options: {
        // colors: colors.greenAccent[200],
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

  useEffect(() => {
    const interval = setInterval(() => {
      get_x_axis(new Date().toISOString());
      // get_y1_axis(Math.floor(Math.random() * 101).toFixed(2));
      // get_y2_axis(Math.floor(Math.random() * 101).toFixed(2));
      // get_y1_axis(data.Temperature);
      // get_y2_axis(data.humidity);
      get_y1_axis(Math.random() * 40);
      get_y2_axis(Math.floor(Math.random() * 70).toFixed(2));
      setVolt_R((x) => getData1());
    }, 1000);
    return () => clearInterval(interval);
  }, [x_axis]);

  return (
    <div className="App">
      <Box m="20px">
        <Header title="DEVICES" subtitle="Here is your device list" />
      </Box>
      <div className="livechart">
        <h3>HOME DHT11</h3>
        <ReactApexChart
          options={Volt_R.options}
          series={Volt_R.series}
          type="area"
          height={350}
          width={400}
        />
        {/* <h2>{count.value}</h2> */}
      </div>
      <br></br>
      <center>
        //{" "}
        <table border="1">
          //{" "}
          <tr>
            // <th>temperature</th>
            // <th>humidity</th>
            //{" "}
          </tr>
          //{" "}
          <tr>
            // {data && <td>{data.Temperature}</td>}
            // {data && <td>{data.humidity}</td>}
            //{" "}
          </tr>
          //{" "}
        </table>
        // <br></br>
        // <h2>{count}</h2>
      </center>
    </div>
  );
};

export default Graph;
