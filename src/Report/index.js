import React, { Component } from "react";
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { Ratiobar } from "../components/ratiobar";

export default class Report extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const radarData = [
			{ word: "Blockchain", A: 150, fullMark: 150 },
			{ word: "Cyrpto", A: 150, fullMark: 150 },
			{ word: "IOT", A: 86, fullMark: 150 },
			{ word: "Security", A: 99, fullMark: 150 },
			{ word: "Automation", A: 85, fullMark: 150 }
		];

		const ratiobar = [{ label: "A", percent: 10 }, { label: "B", percent: 40 }, { label: "C", percent: 50 }];
		return (
			<div>
				<RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={radarData}>
					<PolarGrid />
					<PolarAngleAxis dataKey="word" />
					<Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
				</RadarChart>
				<div style={{ width: "500px" }}>
					<Ratiobar data={ratiobar} />
				</div>
			</div>
		);
	}
}
