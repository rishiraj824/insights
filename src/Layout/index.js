import React, { Component } from "react";
import Dashboard from "../Dashboard/index";
import Landing from "../Landing/index";
import { isMobile } from "react-device-detect";
import { connect } from "react-redux";
import { getNavbar } from "../components/nav";

class Page extends Component {
	render() {
		const { auth, openOnboarding } = this.props;
		return (
			<div>
				{getNavbar(auth)}
				{auth.uid ? <Dashboard openOnboarding={openOnboarding} /> : <Landing />}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth,
		openOnboarding: state.onboarding.open
	};
};

export default connect(
	mapStateToProps,
	null
)(Page);
