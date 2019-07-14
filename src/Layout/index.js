import React, { Component } from "react";
import Dashboard from "../Dashboard/index";
import { signOut, signOutAuthDialog } from "../store/actions/authActions";
import Landing from "../Landing/index";
import { connect } from "react-redux";
import { getNavbar } from "../components/nav";

class Page extends Component {
	render() {
		const { auth, openOnboarding, signOut, signOutDialog, showDialog } = this.props;
		return (
			<div>
				{getNavbar(auth, signOut, signOutDialog, showDialog)}
				{auth.uid ? <Dashboard openOnboarding={openOnboarding} /> : <Landing />}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth,
		openOnboarding: state.onboarding.open,
		showDialog: state.auth.showDialog
	};
};

const mapDispatchToProps = dispatch => {
	return {
		signOut: () => dispatch(signOut()),
		signOutDialog: () => dispatch(signOutAuthDialog())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Page);
