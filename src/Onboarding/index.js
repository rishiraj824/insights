import React, { Component } from "react";
import { connect } from "react-redux";
import { onChange } from "../store/actions/onboarding";
import Modal from "../components/modal";
import Select from "react-select";
import Input from "../components/input";
import One from "./one";
import Two from "./two";
import Three from "./three";

const feet = [{ value: "4", label: "4" }, { value: "5", label: "5" }, { value: "6", label: "6" }];

const inches = [{ value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }];

const braSize = [{ value: "36 A", label: "36 A" }, { value: "35 B", label: "35 B" }, { value: "34 C", label: "34 C" }];

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
		const { values, auth } = this.props;
		return (
			<Modal className="modal" show={isShowing}>
				<div className="flex row wrap main">
					{auth.displayName && (
						<span>
							<h2>
								👋 Hey
								<br />
								<span className={"pink name"}>{auth.displayName} </span>
							</h2>
							{auth.displayName && <p>Lets get to know you before you find the right fit.</p>}
							<br />
							<br />
							{step > 0 && <button onClick={this.prev}>Back</button>}
							<br />
							<br />
							{step < 2 && <button onClick={this.next}>Next</button>}
							<br />
						</span>
					)}

					{step === 0 && (
						<div>
							<div className="question">
								<h3>
									How old are you? <br /> ( 🤫 We won't tell anyone, Promise. )
								</h3>
								<div className={"flex"}>
									<Input value={values.age} onChange={this.onChange} />
									<p>&nbsp;years</p>{" "}
								</div>
							</div>
							<div className="question">
								<h3>How tall are you?</h3>
								<Input value={values.height.feet} onChange={value => this.handleChange({ height: { ...values.height, feet: value.value } })} />
								&nbsp;ft.&nbsp;&nbsp;
								<Input
									value={values.height.inches}
									onChange={value => this.handleChange({ height: { ...values.height, inches: value.value } })}
								/>
								&nbsp;inches.
							</div>
							<div className="question">
								<h3>Choose the bra size that fits you?</h3>
								<Select
									isSearchable
									onChange={value => this.handleChange({ braSize: value.value })}
									value={{ value: values.braSize, label: values.braSize }}
									options={braSize}
								/>
							</div>
							<div className="question">
								<h3>What is your weight?</h3>
								<Input value={values.weight} onChange={this.onChange} />
								lbs.
							</div>
						</div>
					)}
					{step === 1 && <One />}
					{step === 2 && <Two />}
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
