import React from "react";
import "./style.css";
import { connect } from "react-redux";
import { signIn, signInWithEmailPassword, onInputChange, openLoginForm, openSignUpForm, signUpWithEmailPassword } from "../store/actions/authActions";

const landing = ({ signIn, signInWithEmailPassword, openSignUpForm, openLoginForm, signUpForm, signUpWithEmailPassword, onInputChange, email, password }) => {
	return (
		<div className="landing-container white">
			<div className="left">
				<a href="/" className="logo">
					<svg xmlns="http://www.w3.org/2000/svg" width="26" height="31" viewBox="0 0 26 31">
						<g fill="none" fillRule="evenodd" stroke="#000" strokeWidth="1.5" transform="translate(1 1)">
							<path d="M0 28.458V9.253c.505-7.783 16.926-16.194 21.979 0 0 .162.625 2.884 1.874 8.167a.505.505 0 0 1-.492.621h-1.74a.505.505 0 0 0-.505.525c.062 1.659.055 2.488-.021 2.488-5.053-.878-6.19 4.269 0 4.269v3.135a.505.505 0 0 1-.506.505H.505A.505.505 0 0 1 0 28.458z"/>
							<ellipse cx="13.642" cy="12.554" rx="2.021" ry="2.009"/>
						</g>
					</svg>
					&nbsp;Coculture
				</a>
			<div className='input-container'>
				<span className='label'>Email:</span>
				<input onChange={(e)=>onInputChange({ email: e.target.value})} placeholder='name@example.com' type="email" value={email} required />
			</div>
			<div className='input-container'>
				<span className='label'>Password:</span>
				<input onChange={(e)=>onInputChange({ password: e.target.value })} type="password" password={password} required />
			</div>			
			<div className='flex nowrap center space-between auth-action'>
				{signUpForm? <a className='auth-links' onClick={openLoginForm}>Login if you have an account.</a>:<a className='auth-links' onClick={openSignUpForm}>Create Account</a>}
				{signUpForm ? <button onClick={signUpWithEmailPassword.bind(null, email, password)} className='google-auth auth'>Sign Up</button>: 
				<button onClick={signInWithEmailPassword.bind(null, email, password)} className='google-auth auth'>Sign In</button>}
			</div>
			<br/>
			<h3 className='title-center'><span>OR</span></h3>

			<div className="google-auth" onClick={signIn}>
				<img src="https://lh3.googleusercontent.com/zhCjfjBXS6cw3WbR7E_B_cVDvNy7qTmOSdE8MWQaN_-vw7qJ83ae30Rvl78k9e4Gdf8uDVPO6-pfwicwHMsw5Mc=s0" className="google-logo" alt="google-logo" />&nbsp;Sign In with Google
			</div>
			</div>
			
			<div className="right">			
				<img src="https://lh3.googleusercontent.com/XaSVbUEHErMgowkEEY2qiC9_T22V7qIvPqFck5VZyEL8pNQeGpIHWKM3GWhoP8nVDJ-1bkN9lW4cDr8_ce5jJg=s0" alt="hero" />
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth,
		email: state.auth.email,
		password: state.auth.password,
		signUpForm: state.auth.signUpForm
	};
};

const mapDispatchToProps = dispatch => {
	return {
		signIn: () => dispatch(signIn()),
		signInWithEmailPassword: (email, password) => dispatch(signInWithEmailPassword(email, password)),
		openLoginForm: () => dispatch(openLoginForm()),
		openSignUpForm: () => dispatch(openSignUpForm()),
		signUpWithEmailPassword: (email,password) => dispatch(signUpWithEmailPassword(email, password)),
		onInputChange: (payload) => dispatch(onInputChange(payload))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(landing);
