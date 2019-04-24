import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../components/input";
import { onChange } from "../store/actions/onboarding";

function mapStateToProps(state) {
	return {
		values: state.onboarding.values
	};
}

class One extends Component {
	render() {
		const { values, onChange } = this.props;
		return (
			<div className={"body-ref-container"}>
				<img src={"body-ref.png"} className={"body-ref"} />
				<div className={"slider-container"}>
					<label>Shoulder</label>
					<input onChange={e => onChange({ ...values, shoulder: e.target.value })} type="range" min={"1"} max={"3"} step={"1"} />
					<br />
					<label>Waist</label>
					<input onChange={e => onChange({ ...values, waist: e.target.value })} type="range" min="1" max="3" step="1" />
					<br />
					<label>Hip</label>
					<input onChange={e => onChange({ ...values, hip: e.target.value })} type="range" min="1" max="3" step="1" />
				</div>
			</div>
		);
	}
}

const mapDispatchStateToProps = dispatch => {
	return {
		onChange: payload => dispatch(onChange(payload))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchStateToProps
)(One);
