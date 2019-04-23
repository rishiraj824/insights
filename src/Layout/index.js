import React from "react";
import Dashboard from '../Dashboard/index';
import Navbar from './Navbar';
import { connect } from "react-redux";

const Page = props => {
	const { auth, profile } = props;
	
	return (
        <div className={`container ${auth.uid?'':'card'}`}>
            <div>           
				<Navbar />
				{auth.uid && <Dashboard profile={profile}/>}
            </div>
		</div>
	);
};


const mapStateToProps = state => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	};
};

export default connect(mapStateToProps)(Page);

