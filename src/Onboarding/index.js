import React, { Component } from "react";
import { connect } from "react-redux";
import { onChange } from "../store/actions/onboarding";
import Modal from "../components/modal";
import Select from "react-select";

class Onboarding extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowing: true,
			step: 0
		};
	}
	next = () => this.setState({ step: this.state.step + 1 });

	prev = () => this.setState({ step: this.state.step - 1 });

	openModalHandler = () => {
		this.setState({
			isShowing: true
		});
	};

	closeModalHandler = () => {
		this.setState({
			isShowing: false
		});
	};

	handleChange = updated => {
		const { props } = this;
		this.props.onChange({
			values: {
				...props.values,
				...updated
			}
		});
	};

	onChange = e => {
		this.props.onChange({
			values: {
				...this.props.values,
				weight: e.target.value
			}
		});
	};

	render() {
		const { isShowing, step } = this.state;
		const { values, auth, onChange } = this.props;
		return (
			<Modal className="modal" show={isShowing}>
				<div className="flex row wrap main">
					{auth.displayName && (
						<span className={"left"}>
						</span>)
					}
				</div>
			</Modal>
		);
	}
}

const mapStateToProps = state => {
	return {
		profile: state.firebase.profile,
		auth: state.firebase.auth,
		values: state.onboarding.values
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onChange: payload => dispatch(onChange(payload))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Onboarding);
