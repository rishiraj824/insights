import React from "react";
import '../Home.css';
import { signIn, signUp } from "../store/actions/authActions";
import { connect } from "react-redux";

const SignedOutLinks = ({ signIn, signUp }) => {
	return (
		<div className='flex links'>
				<div className="link auth" onClick={signIn}>Login With Google</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth
	};
};

const mapDispatchToProps = dispatch => {
	return {
		signIn: creds => dispatch(signIn(creds)),
		signUp: creds => dispatch(signUp(creds))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignedOutLinks);
