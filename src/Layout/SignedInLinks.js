import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../store/actions/authActions";

const SignedInLinks = props => {
	return (
		<div>
			<ul>
				<li>
					<a onClick={props.signOut}>Log Out</a>
				</li>
				<li>
					<NavLink to="/" className="dp">
						{JSON.stringify(props.profile)}
					</NavLink>
				</li>
			</ul>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		signOut: () => dispatch(signOut())
	};
};

export default connect(
	null,
	mapDispatchToProps
)(SignedInLinks);
