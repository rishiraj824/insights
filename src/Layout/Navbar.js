import React from "react";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";


const Navbar = props => {
	const { auth } = props;
	
	const links = auth.uid ? <SignedInLinks/> : <SignedOutLinks />;
	return (
		<nav> 
			<div className="links">
				{links}
			</div>
		</nav>
	);
};

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	};
};

export default connect(mapStateToProps)(Navbar);
