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

				<div className={"flex column"}>
					<img src="butt-ref.png" className={"butt-ref"} />
					<div className={"flex slider-labels"}>
						<span>Narrow</span> <span>Average</span> <span>Curvier</span>
					</div>
					<input onChange={e => onChange({ ...values, buttShape: e.target.value })} type="range" min="1" max="3" step="1" />
				</div>
				<br />
				<label>Belly Shape</label>
				<div className={"flex column"}>
					<img src="belly-ref.png" className={"butt-ref"} />
					<div className={"flex slider-labels"}>
						<span>Narrow</span> <span>Average</span> <span>Curvier</span>
					</div>
					<input onChange={e => onChange({ ...values, bellyShape: e.target.value })} type="range" min="1" max="3" step="1" />
				</div>
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
