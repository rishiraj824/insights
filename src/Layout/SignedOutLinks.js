import React from "react";
import { NavLink } from "react-router-dom";
import { signIn, signUp } from "../store/actions/authActions";
import { connect } from "react-redux";

const SignedOutLinks = ({ signIn, signUp }) => {
	return (
		<div>
			<ul className="right">
				<li>
					<a onClick={signIn}>Sign Up With Google</a>
				</li>
				<li>
					<a onClick={signUp}>Sign In With Google</a>
				</li>
			</ul>
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
