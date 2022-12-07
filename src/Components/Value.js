import { Box, useTheme } from "@mui/system";
import React from "react";
import Header from "./Header";
import useFetch from "./useFetch";
import { tokens } from "../theme";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

const Value = () => {
	// const [theme, colorMode] = useMode();

	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [values, setValues] = useState([]);
	const [freq, setFreq] = useState([]);
	const [x_axis, setx_axis] = useState([new Date().toISOString()]);
	const [y_axis, sety_axis] = useState(null);
	let arr = [];
	const API = axios.create({ baseURL: process.env.REACT_APP_API });
	API.post("/sensorValue/getData", {
		deviceId: "MQI1-90-38-0C-57-58-BC",
	})
		.then(({ data }) => {
			sety_axis(data.actualData["Frequency"]);
			console.log(y_axis);
			arr = y_axis.map((val) => val.value);
			// console.log(arr);
		})
		.catch((err) => console.log(err));

	// console.log(freq[values.uniqueSensorNames[0]]);
	// console.log(freq);

	function get_y1_axis(y_val) {
		console.log(arr);
		if (y_axis.length < 6) {
			sety_axis([...y_axis, y_val]);
		} else {
			sety_axis([...y_axis.slice(1), y_val]);
		}
	}

	function get_x_axis(x_val) {
		if (x_axis.length < 6) {
			setx_axis([...x_axis, x_val]);
		} else {
			setx_axis([...x_axis.slice(1), x_val]);
		}
	}
	const [Volt_R, setVolt_R] = useState({
		series: [
			{
				name: "Temperature",
				data: y_axis,
			},
		],
		options: {
			chart: {
				height: 350,
				type: "area",
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
					data: y_axis,
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
			let val = freq.map((val) => val.value);
			// console.log(val);
			get_y1_axis(val.pop());
			setVolt_R((x) => getData1());
		}, 1000);
		return () => clearInterval(interval);
	}, [x_axis]);

	// console.log(y_axis);
	return (
		<div>
			<div style={{ gridColumn: "span 2" }}>
				<Typography
					variant="h5"
					m="0.5rem"
					style={{ textAlign: "left" }}
				>
					Values
				</Typography>
				<ReactApexChart
					options={Volt_R.options}
					series={Volt_R.series}
					height={350}
					// type={graphType ? graphType : "area"}
					width={500}
					// color={colors.grey[100]}
				/>
			</div>
		</div>
	);
};

export default Value;
