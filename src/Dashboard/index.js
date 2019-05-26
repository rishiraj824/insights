import React from "react";
import Onboarding from "../Onboarding";

const Dashboard = props => {
	return (
		<div className="dashboard">
			{props.openOnboarding ? <Onboarding/>:''}
		</div>
	);
};

export default Dashboard;
