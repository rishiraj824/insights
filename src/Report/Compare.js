import React, { Component } from "react";
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import { Ratiobar } from "../components/ratiobar";
import "./style.css";
import { getNavbar } from "../components/nav";
import { connect } from "react-redux";
import { getApplicant, getApplicant2 } from "../store/actions/applicants";

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

const colorPalette2 = ["#b0b8f6", "#182687", "#4eb6d7"];

export class Report extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const { getApplicant, getApplicant2 } = this.props;
		getApplicant(this.props.match.params.id1);
		getApplicant2(this.props.match.params.id2);
	}
	render() {
		console.log(this.props.applicant1);
		const { applicant1, applicant2 } = this.props;
		return (
			<div>
				{getNavbar(this.props.auth)}
				<div className={"compare-profile"}>
					{applicant1 && applicant1.name && (
						<div className={"profile"}>
							<h3> {applicant1.name} </h3>
							<p> {applicant1.role}</p>
							<p> {applicant1.experience} year experience</p>
						</div>
					)}

					{applicant2 && applicant2.name && (
						<div className={"profile"}>
							<h3> {applicant2.name} </h3>
							<p> {applicant2.role}</p>
							<p> {applicant2.experience} year experience</p>
						</div>
					)}
				</div>

				<div className="compare">
					<div className={"report-container"}>
						{applicant1.report && (
							<div className={"chart-container"}>
								{applicant1.report &&
									applicant1.report.radarCharts.map((radarChart, key) => (
										<div className={"card tall"} key={key}>
											<MobileView>
												<RadarChart cx={180} cy={180} outerRadius={100} width={350} height={350} data={radarChart.data}>
													<PolarGrid />
													<PolarAngleAxis dataKey="word" />
													<Radar name="Mike" dataKey="A" stroke="#55e0ab" fill="#55e0ab" fillOpacity={0.6} />
												</RadarChart>
											</MobileView>
											<BrowserView>
												<RadarChart cx={300} cy={200} outerRadius={150} width={600} height={400} data={radarChart.data}>
													<PolarGrid />
													<PolarAngleAxis dataKey="word" />
													<Radar name="Mike" dataKey="A" stroke="#55e0ab" fill="#55e0ab" fillOpacity={0.6} />
												</RadarChart>
											</BrowserView>
										</div>
									))}

								{applicant1.report.ratioBarCharts &&
									applicant1.report.ratioBarCharts.map((ratioBarChart, index) => (
										<div className={"card"} key={index}>
											<div className={"title"}>{ratioBarChart.title} </div>
											<div className={"divide"} />
											<Ratiobar data={ratioBarChart.data} />
											<br />
										</div>
									))}

								{applicant1.report.textCharts &&
									applicant1.report.textCharts.map((textChart, index) => (
										<div className={"card"} key={index}>
											<div className={"title"}>{textChart.title} </div>
											<div className={"divide"} />
											<div className={"big-text"}> {textChart.data}</div>
											<br />
										</div>
									))}
							</div>
						)}
					</div>
					<div className={"report-container"}>
						{applicant2.report && (
							<div className={"chart-container"}>
								{applicant2.report &&
									applicant2.report.radarCharts.map((radarChart, key) => (
										<div className={"card tall"} key={key}>
											<MobileView>
												<RadarChart cx={180} cy={180} outerRadius={100} width={350} height={350} data={radarChart.data}>
													<PolarGrid />
													<PolarAngleAxis dataKey="word" />
													<Radar name="Mike" dataKey="A" stroke={colorPalette2[0]} fill={colorPalette2[0]} fillOpacity={0.6} />
												</RadarChart>
											</MobileView>
											<BrowserView>
												<RadarChart cx={300} cy={200} outerRadius={150} width={600} height={400} data={radarChart.data}>
													<PolarGrid />
													<PolarAngleAxis dataKey="word" />
													<Radar name="Mike" dataKey="A" stroke={colorPalette2[0]} fill={colorPalette2[0]} fillOpacity={0.6} />
												</RadarChart>
											</BrowserView>
										</div>
									))}

								{applicant2.report.ratioBarCharts &&
									applicant2.report.ratioBarCharts.map((ratioBarChart, index) => (
										<div className={"card"} key={index}>
											<div className={"title"}>{ratioBarChart.title} </div>
											<div className={"divide"} />
											<Ratiobar data={ratioBarChart.data} colorPalette={colorPalette2} />
											<br />
										</div>
									))}

								{applicant2.report.textCharts &&
									applicant2.report.textCharts.map((textChart, index) => (
										<div className={"card"} key={index}>
											<div className={"title"}>{textChart.title} </div>
											<div className={"divide"} />
											<div className={"big-text"}> {textChart.data}</div>
											<br />
										</div>
									))}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth,
		applicant1: state.applicant,
		applicant2: state.applicant2
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getApplicant: payload => dispatch(getApplicant(payload)),
		getApplicant2: payload => dispatch(getApplicant2(payload))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Report);
