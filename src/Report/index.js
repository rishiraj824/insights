import React, { Component } from "react";
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import { Ratiobar } from "../components/ratiobar";
import "./style.css";

const dummyReport = {
	radarCharts: [
		{
			title: "Trends",
			data: [
				{ word: "Blockchain", A: 150, fullMark: 150 },
				{ word: "Cyrpto", A: 150, fullMark: 150 },
				{ word: "IOT", A: 86, fullMark: 150 },
				{ word: "Security", A: 99, fullMark: 150 },
				{ word: "Automation", A: 85, fullMark: 150 }
			]
		}
	],

	ratioBarCharts: [
		{
			title: "I vs We",
			data: [{ label: "I/Me", percent: 10, val: 5 }, { label: "We/Us", percent: 90, val: 45 }]
		},
		{
			title: "Postive vs Negative",
			data: [{ label: "Positive", percent: 40, val: 100 }, { label: "Negative", percent: 60, val: 400 }]
		}
	],
	textCharts: [
		{
			title: "Words similar to Team",
			data: "7232 Mentions"
		},
		{
			title: "Questions Asked",
			data: "7 Questions"
		},
		{
			title: "Words similar to Innovation",
			data: "23 Mentions"
		}
	]
};

const dummyUser = {
	name: "John Paul",
	experience: 2,
	age: 25,
	role: "UI Lead"
};

export default class Report extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className={"report-container"}>
				<div className={"profile"}>
					<h3> {dummyUser.name} </h3>
					<p> {dummyUser.role}</p>
					<p> {dummyUser.experience} year experience</p>
				</div>
				<div className={"chart-container"}>
					{dummyReport.radarCharts.map(radarChart => (
						<div className={"card tall"}>
							<MobileView>
								<RadarChart cx={180} cy={180} outerRadius={100} width={350} height={350} data={radarChart.data}>
									<PolarGrid />
									<PolarAngleAxis dataKey="word" />
									<Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
								</RadarChart>
							</MobileView>
							<BrowserView>
								<RadarChart cx={300} cy={200} outerRadius={150} width={600} height={400} data={radarChart.data}>
									<PolarGrid />
									<PolarAngleAxis dataKey="word" />
									<Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
								</RadarChart>
							</BrowserView>
						</div>
					))}

					{dummyReport.ratioBarCharts.map(ratioBarChart => (
						<div className={"card"}>
							<div className={"title"}>{ratioBarChart.title} </div>
							<div className={"divide"} />
							<Ratiobar data={ratioBarChart.data} />
							<br />
						</div>
					))}

					{dummyReport.textCharts.map(textChart => (
						<div className={"card"}>
							<div className={"title"}>{textChart.title} </div>
							<div className={"divide"} />
							<div className={"big-text"}> {textChart.data}</div>
							<br />
						</div>
					))}
				</div>
			</div>
		);
	}
}
