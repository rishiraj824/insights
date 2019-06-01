import React, { Component } from "react";
import { connect } from "react-redux";
import { onChange, addApplicant } from "../store/actions/onboarding";
import ReactTable from 'react-table';
import '../../node_modules/react-table/react-table.css'
import Modal from "react-modal";
import { getApplicants } from "../store/actions/applicants";

class Onboarding extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowing: false,
			data: []
		};
	}

	componentDidMount() {
		const { getApplicants } = this.props;
		getApplicants();
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
		const { addApplicant, values } = this.props;
		const { applicants: data } = this.props;
		
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
				<Modal 
					isOpen={isShowing}
					onRequestClose={this.closeModalHandler}
				>
					<h3>Add Applicant</h3>
					<input onChange={(e)=>this.handleChange({ name: e.target.value })} placeholder="Name"/>
					<input onChange={(e)=>this.handleChange({ experience: e.target.value })} placeholder="Experience"/>
					<input onChange={(e)=>this.handleChange({ age: e.target.value })} placeholder="Age"/>
					<input onChange={(e)=>this.handleChange({ role: e.target.value })} placeholder="Job Role"/>
					<button onClick={()=>{addApplicant(values); this.closeModalHandler()}}>Submit</button>
				</Modal>
				</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		profile: state.firebase.profile,
		auth: state.firebase.auth,
		values: state.onboarding.values,
		applicants: state.applicants
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onChange: payload => dispatch(onChange(payload)),
		addApplicant: payload => dispatch(addApplicant(payload)),
		getApplicants: payload => dispatch(getApplicants(payload))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Onboarding);
