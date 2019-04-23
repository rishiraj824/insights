import React from "react";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


const Navbar = props => {
	const { auth, profile } = props;
	
	const links = auth.uid ? null : <SignedOutLinks />;

	return (
		<nav>
			<h2 className="logo">
				<Link to="/" className="brand-logo">
					PrimeFit
				</Link>
				<p className="caption">Your way to a perfect fit.</p>
			</h2>     
			<div className="container">
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
