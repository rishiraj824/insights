import React, { Component } from "react";
import { connect } from "react-redux";
import { onChange } from "../store/actions/onboarding";
import Modal from "../components/modal";
import Select from "react-select";
import One from "./one";
import Two from "./two";
import Three from "./three";

const feet = [{ value: "4", label: "4" }, { value: "5", label: "5" }, { value: "6", label: "6" }];

const inches = [{ value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }];
const BRA_SIZES = [
	"32A",
	"30B",
	"28C",
	"34A",
	"32B",
	"30C",
	"28D",
	"36A",
	"34B",
	"32C",
	"30D",
	"28E",
	"38A",
	"36B",
	"34C",
	"32D",
	"30E",
	"28F",
	"40A",
	"38B",
	"36C",
	"34D",
	"32E",
	"30F",
	"28G",
	"42A",
	"40B",
	"38C",
	"36D",
	"34E",
	"32F",
	"30G",
	"28H",
	"44A",
	"42B",
	"40C",
	"38D",
	"36E",
	"34F",
	"32G",
	"30H",
	"28I",
	"44B",
	"42C",
	"40D",
	"38E",
	"36F",
	"34G",
	"32H",
	"30I",
	"28J",
	"44C",
	"42D",
	"40E",
	"38F",
	"36G",
	"34H",
	"32I",
	"30J",
	"28K",
	"44D",
	"42E",
	"40F",
	"38G",
	"36H",
	"34I",
	"32J",
	"30K",
	"28L",
	"44E",
	"42F",
	"40G",
	"38H",
	"36I",
	"34J",
	"32K",
	"30L",
	"28M",
	"44F",
	"42G",
	"40H",
	"38I",
	"36J",
	"34K",
	"32L",
	"30M",
	"28N",
	"44G",
	"42H",
	"40I",
	"38J",
	"36K",
	"34L",
	"32M",
	"30N",
	"28O",
	"44H",
	"42I",
	"40J",
	"38K",
	"36L",
	"34M",
	"32N",
	"30O",
	"28P",
	"44I",
	"42J",
	"40K",
	"38L",
	"36M",
	"34N",
	"32O",
	"30P",
	"44J",
	"42K",
	"40L",
	"38M",
	"36N",
	"34O",
	"32P"
];

const braSize = BRA_SIZES.map(size => ({ value: size, label: size }));

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
						<span className={"left"}>
							{
								<h2>
									👋 Hey
									<br />
									<span className={"pink name"}>{auth.displayName} </span>
								</h2>
							}

							{auth.displayName && step === 0 && <p>Lets get to know you before you find the right fit.</p>}
							{auth.displayName && step === 1 && <p>Answer a couple of questions to get the right fit.</p>}
							{auth.displayName && step === 2 && <p>Almost there. Last questions </p>}
							<br />
							<br />
							{step < 2 ? (
								<button onClick={this.next}>Next</button>
							) : (
								<button disabled onClick={this.next}>
									Next
								</button>
							)}
							<br />
							<br />
							{step > 0 ? (
								<button onClick={this.prev}>Back</button>
							) : (
								<button disabled onClick={this.prev}>
									Back
								</button>
							)}

							<br />
						</span>
					)}
					{step === 0 && (
						<div>
							<div className="question">
								<h3>
									How old are you? <br /> ( 🤫 We won't tell anyone, Promise. )
								</h3>
								<input onChange={this.onChange} style={{ width: "3rem" }} type="number" min="1" />
								<p>&nbsp;years</p>{" "}
							</div>
							<div className="question">
								<h3>How tall are you?</h3>
								<input
									value={values.height.feet}
									onChange={value => this.handleChange({ height: { ...values.height, feet: value.value } })}
									style={{ width: "3rem" }}
									type="number"
									min="1"
								/>
								&nbsp;ft.&nbsp;&nbsp;
								<input
									onChange={value => this.handleChange({ height: { ...values.height, inches: value.value } })}
									style={{ width: "3rem" }}
									type="number"
									min="1"
								/>
								&nbsp;inches.
							</div>
							<div className="question">
								<h3>Choose the bra size that fits you?</h3>
								<Select isSearchable onChange={value => this.handleChange({ braSize: value.value })} options={braSize} />
							</div>
							<div className="question">
								<h3>What is your weight?</h3>
								<input onChange={this.onChange} style={{ width: "3rem" }} type="number" min="1" />
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
