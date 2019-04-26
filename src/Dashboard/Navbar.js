import { connect } from "react-redux";
import { signOut } from "../store/actions/authActions";
import React from 'react';
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
    return <div className="flex row">
        <div className="home-link">
            <NavLink to="/">Explore</NavLink>
        </div>
        <div className="home-link">
            <NavLink to="/new">Share Photo</NavLink>
        </div>
        <div className="home-link">
            <NavLink to="/" className="dp">
                {JSON.stringify(props.profile)}
            </NavLink>
        </div>
        <div className="home-link">
            <a onClick={props.signOut}>Log Out</a>
        </div>
    </div>
}

const mapDispatchToProps = dispatch => {
	return {
		signOut: () => dispatch(signOut())
	};
};

export default connect(
	null,
	mapDispatchToProps
)(Navbar);
