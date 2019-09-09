import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onChange, addApplicant } from '../store/actions/onboarding';
import ReactTable from 'react-table';
import '../../node_modules/react-table/react-table.css';
import Modal from 'react-modal';
import { getApplicants, onFilteredChange, filterAllFunction, roleFilter, filterAllMobFunction } from '../store/actions/applicants';
import { isMobile } from 'react-device-detect';
import '../Mobile.css';
import '../Table.css';
import matchSorter from 'match-sorter';

class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowing: false,
      loading: true
    };
  }

  componentDidMount() {
    const { getApplicants } = this.props;
    getApplicants();
    this.setState({
      loading: false
    });
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
        onClick: () => {
          // window.location.href = `/applicant/${rowInfo.original.id}/interview`;
        }
      };
    }
    return {};
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
    const { isShowing, loading } = this.state;
    const { addApplicant, values, role, onFilteredChange, roleFilter, filtered, filterAllMobFunction, filterAll, filterAllFunction } = this.props;
    const { applicants: data, original } = this.props;
    const columns = [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Role',
        accessor: 'role'
      },
      {
        Header: 'Experience',
        accessor: 'experience'
      },
      {
        Header: 'Age',
        accessor: 'age'
      },
      {
        Header: 'Report',
        Cell: data => {
          console.log(data.original.report);
          return data.original.report !== 'UNAVAILABE' && data.original.report ? (
            <button
              onClick={event => {
                event.stopPropagation();
                window.location.href = `/applicant/${data.original.id}/report`;
              }}>
              View Report
            </button>
          ) : (
            'N/A'
          );
        }
      },
      {
        Header: '',
        Cell: data => {
          return (
            <button
              onClick={() => {
                window.location.href = `/applicant/${data.id}/interview`;
              }}>
              Record
            </button>
          );
        }
      },

      {
        Header: 'All',
        id: 'all',
        show: false,
        width: 0,
        resizable: false,
        sortable: false,
        Filter: () => {},
        getProps: () => {
          return {
            // style: { padding: "0px"}
          };
        },
        filterMethod: (filter, rows) => {
          const result = matchSorter(rows, filter.value, {
            keys: ['name', 'age', 'role', 'experience'],
            threshold: matchSorter.rankings.WORD_STARTS_WITH
          });
          return result;
        },
        filterAll: true
      }
    ];
    const rolesSet = new Set();
    original.map(applicant => {
      rolesSet.add(applicant.role);
    });
    const roles = Array.from(rolesSet);
    const options = roles.map((role, i) => {
      return (
        <option key={i + role} value={role}>
          {role}
        </option>
      );
    });
    return (
      <div className='flex row wrap dashboard space-evenly'>
        {isMobile ? (
          <div style={{ width: '100%' }}>
            <div className='mobileFilters'>
              <input value={filterAll} onChange={filterAllMobFunction} className='mobileSearch' placeholder='Search' />
              <select onChange={e => roleFilter(e.target.value)} className='mobileSelect' value={role}>
                <option key={'0all'} value={'all'}>
                  Show All ({original.length})
                </option>
                {options}
              </select>
            </div>
            <h3 className='addition mobileAddition' onClick={this.openModalHandler}>
              + Add Applicant
            </h3>
            <div className='cards'>
              {data.map(applicant => {
                return (
                  <div key={applicant.id} className='mobileCard'>
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
                      {applicant.report && applicant.report.length > 0 && (
                        <div key={3} className='mobileFields'>
                          <button
                            onClick={() => {
                              window.location.href = `/applicant/${applicant.id}/report`;
                            }}>
                            View Report
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            <div className='filters'>
              <h3 className='filterHeader'>Show</h3>
              <div onClick={roleFilter.bind(null, 'all')} className={role === 'all' ? 'filterMain' : 'filter'}>
                All Applicants ({original.length})
              </div>
              {roles.map((roley, ind) => (
                <div key={ind} onClick={roleFilter.bind(null, roley)} className={role === roley ? 'filterMain' : 'filter'}>
                  {roley}
                </div>
              ))}
            </div>
            <div className='table'>
              <div className='actions'>
                <input value={filterAll} onChange={filterAllFunction} placeholder='Search' />
                <h3 className='addition' onClick={this.openModalHandler}>
                  + Add Applicant
                </h3>
              </div>
              <ReactTable
                data={data}
                columns={columns}
                loading={loading}
                sortable={true}
                defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                onFilteredChange={onFilteredChange}
                filtered={filtered}
                multiSort={true}
                showPagination={false}
                showPageSizeOptions={false}
                defaultPageSize={10}
                resizable={false}
                // getTrProps={this.getTrProps}
              />
            </div>
          </>
        )}
        <Modal isOpen={isShowing} onRequestClose={this.closeModalHandler}>
          <div className='flex wrap center space-evenly formContainer'>
            <img alt='add' src='https://lh3.googleusercontent.com/P65rjcP3ZNAdcnicw0bD1WIc-oMaQWKob89NpThHFHT6fq1eJ30-Y3P2V3_dJSeGkwQG7YHCu8YDh4GbyjZ81qQ=s0' />
            <div className='form flex center column'>
              <h3>Add Applicant</h3>
              <input onChange={e => this.handleChange({ name: e.target.value })} placeholder='Name' />
              <input type='number' min='1' onChange={e => this.handleChange({ experience: e.target.value })} placeholder='Experience' />
              <input type='number' min='1' onChange={e => this.handleChange({ age: e.target.value })} placeholder='Age' />
              <input onChange={e => this.handleChange({ role: e.target.value })} placeholder='Job Role' />
              <button
                className='primary margin-top-bottom-20'
                onClick={() => {
                  addApplicant(values);
                  this.closeModalHandler();
                }}>
                Submit
              </button>
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
    applicants: state.applicants.data,
    history: state.history,
    filterAll: state.applicants.filterAll,
    filtered: state.applicants.filtered,
    role: state.applicants.role,
    original: state.applicants.original
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChange: payload => dispatch(onChange(payload)),
    addApplicant: payload => dispatch(addApplicant(payload)),
    getApplicants: payload => dispatch(getApplicants(payload)),
    filterAllFunction: payload => dispatch(filterAllFunction(payload)),
    filterAllMobFunction: payload => dispatch(filterAllMobFunction(payload)),
    roleFilter: payload => dispatch(roleFilter(payload)),
    onFilteredChange: (filtered, filterAllState) => dispatch(onFilteredChange(filtered, filterAllState))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Onboarding);
