import React from "react";
import '../Home.css';
import { signIn, signUp } from "../store/actions/authActions";
import { connect } from "react-redux";

const SignedOutLinks = ({ signIn, signUp }) => {
	return (
		<div className='flex links'>
				<p className="link">New User? </p>
				<div className="google-auth link" onClick={signUp}>Sign Up With Google</div>	
				<div className="divider link"></div>	
				<div className="google-auth link" onClick={signIn}>Sign In With Google</div>
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
