import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../components/input";
import { onChange, addUser } from "../store/actions/onboarding";

function mapStateToProps(state) {
	return {
		values: state.onboarding.values,
		auth: state.firebase.auth
	};
}

class Two extends Component {
	render() {
		const { values, onChange, addUser, auth } = this.props;
		return (
			<div>
				<label>Butt Shape</label>
				<input onChange={e => onChange({ ...values, buttShape: e.target.value })} type="range" min="1" max="3" step="1" />

				<br />
				<label>Belly Shape</label>
				<input onChange={e => onChange({ ...values, bellyShape: e.target.value })} type="range" min="1" max="3" step="1" />
				<button
					onClick={() =>
						addUser({
							...values,
							id: auth.uid,
							name: auth.displayName
						})
					}>
					Finish
				</button>
			</div>
		);
	}
}

const mapDispatchStateToProps = dispatch => {
	return {
		onChange: payload => dispatch(onChange(payload)),
		addUser: payload => dispatch(addUser(payload))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchStateToProps
)(Two);
