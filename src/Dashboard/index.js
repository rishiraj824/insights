import React from "react";
import Navbar from './Navbar';
import Onboarding from "../Onboarding";
import Search from '../Search/index';

const Dashboard = props => {
	console.log(props);
	return (
		<div className="dashboard">
			<Navbar />
			{props.openOnboarding ? <Onboarding/>:<Search />}
		</div>
	);
};

export default Dashboard;
