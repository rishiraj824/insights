import React, { Component } from "react";
import Dashboard from '../Dashboard/index';
import Navbar from './Navbar';
import { connect } from "react-redux";
import { fetchUser } from "../store/actions/authActions";

class Page extends Component {

	componentDidMount(){
		const { auth } = this.props;
		this.props.fetchUser(auth.uid)
	}

	render() {
		const { auth, profile, openOnboarding } = this.props;	
		return (
			<div className={`container ${auth.uid?'':'card'}`}>
				<div>           
					<Navbar />
					<Dashboard openOnboarding={openOnboarding}/>
				</div>
			</div>
		);
	}
};


const mapStateToProps = state => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile,
		openOnboarding: state.onboarding.open
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchUser: id => dispatch(fetchUser(id))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Page);

