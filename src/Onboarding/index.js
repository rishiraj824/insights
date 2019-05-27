import React, { Component } from "react";
import { connect } from "react-redux";
import { onChange } from "../store/actions/onboarding";
import Modal from "../components/modal";
import Select from "react-select";
import ReactTable from 'react-table';
import '../../node_modules/react-table/react-table.css'

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
		const data = [{
			name: 'Tanner Linsley',
			age: 26,
			friend: {
			  name: 'Jason Maurer',
			  age: 23,
			}
		  }]
		
		  const columns = [{
			Header: 'Name',
			accessor: 'name' // String-based value accessors!
		  }, {
			Header: 'Age',
			accessor: 'age',
			Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
		  }, {
			id: 'friendName', // Required because our accessor is not a string
			Header: 'Friend Name',
			accessor: d => d.friend.name // Custom value accessors!
		  }, {
			Header: props => <span>Friend Age</span>, // Custom header components!
			accessor: 'friend.age'
		  }]
		return (
				<div className="flex row wrap">
				<div className="filters">
					<div>Senior Dev</div>
					<div>Analyst</div>
				</div>
				<ReactTable
					data={data}
					columns={columns} 
				/>
				</div>
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
