import React from "react";
import Onboarding from "../Onboarding";

const Dashboard = props => {
	return (
		<div className="dashboard">		
			<Onboarding {...props}/>
		</div>
	);
};

export default Dashboard;
