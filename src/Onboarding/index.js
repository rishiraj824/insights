import React, { Component } from "react";
import { connect } from "react-redux";
import { onChange } from "../store/actions/onboarding";
import Modal from '../components/modal';
import Select from 'react-select';
import Input from '../components/input';
import One from './one';
import Two from './two';
import Three from './three';

const feet = [
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' }
  ];

const inches = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' }
  ];

const cup = [
    { value: '36', label: '36' },
    { value: '35', label: '35' },
    { value: '34', label: '34' }
  ];

const cupsize = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' }
  ];


class Onboarding extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isShowing: true,
            step:0,
            values: {
                height: {
                    feet:4,
                    inches:1
                },
                weight: '120',
                cup:{
                    size:'35',
                    alpha: 'A'
                }
            }
        }
    }
    next = () => this.setState({ step: this.state.step + 1 });

    prev = () => this.setState({ step: this.state.step - 1 });
    
    openModalHandler = () => {
        this.setState({
            isShowing: true
        });
    }

    closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
    }

    handleChange = (updated) => {
        const { state } = this;
        this.setState({ 
            values:{
                ...state.values,
                ...updated
            } 
        });
    }

    onChange = (e) => {
        this.props.onChange({
            values: {
                ...this.state.values,
                weight: e.target.value
            }
        })
    }


    render() {
        const { isShowing, step, values } = this.state;
        
        return (<Modal
                className="modal"
                show={isShowing}
                close={this.closeModalHandler}>
                {step===0&&
                    <div>
                <div className="question">
                    <h3>How tall are you?</h3>
                    <Select onChange={(e)=> this.onChange({height: {...values.height,feet:e.target.value}})} value={values.height.feet} options={feet}/>
                    <Select onChange={(e)=> this.onChange({height: {...values.height,inches:e.target.value}})} value={values.height.inches} options={inches}/>            
                </div>   
                <div className="question">
                    <h3>What is your bra size?</h3>
                    <Select onChange={(e)=> this.onChange({size: {...values.cup,size:e.target.value}})} value={values.cup.size} options={cup} />
                    <Select onChange={(e)=> this.onChange({size: {...values.cup,alpha:e.target.value}})} value={values.cup.alpha} options={cupsize} />                                                   
                </div>   
                <div className="question">
                    <h3>What is your weight?</h3>
                    <Input value={values.weight} onChange={this.onChange} />
                </div>
                </div>} 
                {step<3&&<button onClick={this.next}>Next</button>}
                {step>0&&<button onClick={this.prev}>Back</button>}             
                {step===1&&<One />}
                {step===2&&<Two />}
                {step===3&&<Three/>}
            </Modal>
        );
    };
};

const mapStateToProps = state => {
	return {
        profile: state.firebase.profile,
        questions: Object.keys(state.onboarding.questions).map(key=>state.onboarding.questions[key])
	};
};


const mapDispatchToProps = dispatch => {
	return {
		onChange: payload => dispatch(onChange(payload)),
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
