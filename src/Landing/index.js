import React from "react";
import "./style.css";
import DressCard from "../DressCard";
import { connect } from "react-redux";
import { signIn, signUp } from "../store/actions/authActions";

const landing = ({ signIn }) => {
	console.log(signIn);
	return (
		<div className="landing-container">
			<h1 className="pink">
				Get the Best Fit <br />
				You Deserve. 💁‍👗👌
			</h1>
			<p>
				Join a community of fashionistas and fashion enthusiasists helping you find your perferct fit and style.
				<br />
				Join PrimeFit and experience magic
			</p>
			<div className="link auth" onClick={signIn} style={{ margin: "0", zIndex: "100" }}>
				Login With Google
			</div>
			<br />
			<div className="dress-carousel">
				<DressCard onClick={signIn} name="Floral Top" likeability={10} rating={4} imgUrl={"sam1.png"} />
				<DressCard onClick={signIn} name="Sleveless Top" likeability={4} rating={5} imgUrl={"sam2.png"} />
				<DressCard onClick={signIn} name="Blank Tank" likeability={150} rating={10} imgUrl={"sam3.png"} />
			</div>
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
		signIn: creds => dispatch(signIn()),
		signUp: creds => dispatch(signUp())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(landing);
