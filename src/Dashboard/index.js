import React from "react";
import Onboarding from "../Onboarding";

const Dashboard = props => {
	return (
		<div className="dashboard">		
			{true ? <Onboarding/>:''}
		</div>
	);
};

export default Dashboard;
