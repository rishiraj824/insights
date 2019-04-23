import React from "react";
import Navbar from './Navbar';
import Onboarding from "../Onboarding";
import Search from '../Search/index';

const Dashboard = props => {
	return (
		<div className="dashboard">
			<Navbar />
			{props.profile.isEmpty ? <Onboarding/>:<Search />}
		</div>
	);
};

export default Dashboard;
