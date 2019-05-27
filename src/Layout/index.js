import React, { Component } from "react";
import Dashboard from "../Dashboard/index";
import Landing from "../Landing/index";
import { connect } from "react-redux";
import { fetchUser } from "../store/actions/authActions";

class Page extends Component {
	componentDidMount() {
		const { auth } = this.props;
		auth.uid && this.props.fetchUser(auth.uid);
	}

	render() {
		const { auth, openOnboarding } = this.props;
		return (
			<div>
				{/* <Navbar /> */}
				{!auth.uid ? <Dashboard openOnboarding={openOnboarding} /> : <Landing />}				
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

const mapDispatchToProps = dispatch => {
	return {
		fetchUser: id => dispatch(fetchUser(id))
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Page);
