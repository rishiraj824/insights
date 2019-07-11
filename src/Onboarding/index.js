import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { onChange, addApplicant } from "../store/actions/onboarding";
import ReactTable from 'react-table';
import '../../node_modules/react-table/react-table.css'
import Modal from "react-modal";
import { getApplicants } from "../store/actions/applicants";
import {isMobile} from 'react-device-detect';
import '../Mobile.css';
import '../Table.css';

class Onboarding extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowing: false,
			data: [],
			loading: true
		};
	}

	componentDidMount() {
		const { getApplicants } = this.props;
		getApplicants();
		this.setState({
			loading: false
		})
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
	getTrProps = (state, rowInfo, instance) => {
	  if (rowInfo) {
		return {
			onClick: ()=> {
				console.log(rowInfo.original);
				console.log(this.context);
				//this.context.history.push(`/applicant/interview/${rowInfo.original.id}`)
				window.location.href = `/applicant/${rowInfo.original.id}/interview`
			}
		}
	  }
	  return {};
	}

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
		const { isShowing, loading } = this.state;
		const { addApplicant, values } = this.props;
		const { applicants: data } = this.props;
		  const columns = [{
			Header: 'Name',
			accessor: 'name'
		  }, {
			Header: 'Role',
			accessor: 'role',
			Cell: props => <span className='number'>{props.value}</span> 
			}, {			
				Header: 'Experience',
				accessor: 'experience' 
			},{
			Header: 'Age',
			accessor: 'age'
		  }]
		return (
				<div className="flex row wrap dashboard space-evenly">
				{isMobile?<div style={{width: '100%'}}>
					<div className='mobileFilters'>				
						<input className='mobileSearch' placeholder="Search" />
						<select className='mobileSelect' value='analyst'>
							<option value={'analyst'}>Analyst</option>
							<option value={'dev'}>Dev</option>
						</select>
					</div>
					<h3 className="addition mobileAddition" onClick={this.openModalHandler}>+ Add Applicant</h3>
					<div className='cards'>
						{data.map(applicant=>{
							return <div onClick={()=> {
				window.location.href = `/applicant/${applicant.id}/interview`
			}} key={applicant.id} className='mobileCard'>
								<div className='fields'>
								<div key={0} className='mobileFields'>
									<h4>Name</h4>
									<h5>{applicant.name}</h5>
								</div>
								<div key={1} className='mobileFields'>
									<h4>Experience</h4>
									<h5>{applicant.experience}</h5>
								</div>
								<div key={2} className='mobileFields'>
									<h4>Role</h4>
									<h5>{applicant.role}</h5>
								</div>
								<div key={3} className='mobileFields'>
									<h4>Age</h4>
									<h5>{applicant.age}</h5>
								</div>
								</div>
							</div>
						})}
					</div>					
					</div>:<>
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
						loading={loading}
						sortable={true}
						multiSort={true}
						showPagination={false}
						showPageSizeOptions={false}
						defaultPageSize={10}
						resizable={false}
						getTrProps={this.getTrProps}
					/>
				</div>
				</>}
				<Modal 
					isOpen={isShowing}
					onRequestClose={this.closeModalHandler}
				>
						<div className='flex wrap center space-evenly formContainer'>
							<img alt='add' src='https://lh3.googleusercontent.com/P65rjcP3ZNAdcnicw0bD1WIc-oMaQWKob89NpThHFHT6fq1eJ30-Y3P2V3_dJSeGkwQG7YHCu8YDh4GbyjZ81qQ=s0' />
						<div className='form flex center column'>
							<h3>Add Applicant</h3>
							<input onChange={(e)=>this.handleChange({ name: e.target.value })} placeholder="Name"/>
							<input type='number' min='1' onChange={(e)=>this.handleChange({ experience: e.target.value })} placeholder="Experience"/>
							<input type='number' min='1' onChange={(e)=>this.handleChange({ age: e.target.value })} placeholder="Age"/>
							<input onChange={(e)=>this.handleChange({ role: e.target.value })} placeholder="Job Role"/>
							<button className='primary margin-top-bottom-20' onClick={()=>{addApplicant(values); this.closeModalHandler()}}>Submit</button>
						</div>
						</div>
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
		applicants: state.applicants,
		history: state.history
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