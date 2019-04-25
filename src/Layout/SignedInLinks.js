import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../store/actions/authActions";
import { openSharer } from '../store/actions/share';

const SignedInLinks = props => {
	return (
		<div>
			<ul>
				<li>
					<NavLink to="/search">Dresses</NavLink>
				</li>
				<li>
					<NavLink onClick={props.openSharer}>Share Photo</NavLink>
				</li>
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
		signOut: () => dispatch(signOut()),
		openSharer: () => dispatch(openSharer())
	};
};

export default connect(
	null,
	mapDispatchToProps
)(SignedInLinks);
