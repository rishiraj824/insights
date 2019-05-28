import React, { Component } from "react";
import { connect } from "react-redux";
import { onChange } from "../store/actions/onboarding";
import Modal from "../components/modal";
import Select from "react-select";
import ReactTable from 'react-table';
import '../../node_modules/react-table/react-table.css'
import modal from "../components/modal";

class Onboarding extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowing: false
		};
	}
	

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
	

	render() {
		const { isShowing } = this.state;
		const { values, auth, onChange } = this.props;
		const data = [{
			name: 'Tanner Linsley',
			role: 'VP Engineering',
			experience: '3',
			age: '23'
		  }]
		
		  const columns = [{
			Header: 'Name',
			accessor: 'name' // String-based value accessors!
		  }, {
			Header: 'Role',
			accessor: 'role',
			Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
		  }, {			
				Header: 'Experience',
				accessor: 'experience' // String-based value accessors!
			},{
			Header: 'Age', // Custom header components!
			accessor: 'age'
		  }]
		return (
				<div className="flex row wrap dashboard space-evenly">
				<div className="filters">
				<h3 className="filterHeader">Show</h3>
					<div className="filterMain">All Applicants</div>
					<div className="filter">Analyst</div>
				</div>
				<div className="table">
					<div className="actions">
						<input placeholder="Search" />
						<h3 className="addition" onClick={this.openModalHandler}>+ Add Applicant</h3>
					</div>
					<ReactTable
						data={data}
						columns={columns} 
						defaultPageSize={10}
						className="-striped -highlight"
					/>
				</div>
				<Modal show={isShowing}>
					<h3>Add Applicant</h3>
					<input onChange={(e)=>this.handleChange.bind(this, { name: e.target.value })} placeholder="Name"/>
					<input onChange={(e)=>this.handleChange.bind(this, { experience: e.target.value })} placeholder="Experience"/>
					<input onChange={(e)=>this.handleChange.bind(this, { age: e.target.value })} placeholder="Age"/>
					<input onChange={(e)=>this.handleChange.bind(this, { role: e.target.value })} placeholder="Job Role"/>
				</Modal>
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
