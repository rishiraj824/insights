import React, { Component } from 'react';
import './Recorder.css';
import { getApplicant, updateTranscript } from './store/actions/applicants';
import {isMobile} from 'react-device-detect';
import { connect } from "react-redux";
import questions from './questions';
import Dictaphone from './SpeechButton';

class Recorder extends Component {
    constructor(props){
        super(props);
        this.state = {
            question: 'Tell me about a time when you were faced with a problem that had a number of possible solutions. What was the problem and how did you determine the course of action? What was the outcome of that choice?'
        }
    }
    componentDidMount() {
        const { getApplicant } = this.props;
        getApplicant(this.props.match.params.id)
    }
    changeQuestion = () => {
        this.setState({
            question: questions[Math.round(Math.random() * (questions.length - 0))].question
        })
    }
    render() {
        //const applicant = {"age":22,"experience":2,"name":"Benjamin Tod","role":"Assistant Manager"};
        const { auth, applicant, updateTranscript } = this.props;
        const id = this.props.match.params.id;
        const { question } = this.state;
        return (
            <>
            {auth.uid? <div className="logoNav">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="31" viewBox="0 0 26 31">
                        <g fill="none" fillRule="evenodd" stroke="#000" strokeWidth="1.5" transform="translate(1 1)">
                            <path d="M0 28.458V9.253c.505-7.783 16.926-16.194 21.979 0 0 .162.625 2.884 1.874 8.167a.505.505 0 0 1-.492.621h-1.74a.505.505 0 0 0-.505.525c.062 1.659.055 2.488-.021 2.488-5.053-.878-6.19 4.269 0 4.269v3.135a.505.505 0 0 1-.506.505H.505A.505.505 0 0 1 0 28.458z"/>
                            <ellipse cx="13.642" cy="12.554" rx="2.021" ry="2.009"/>
                        </g>
                    </svg>
                &nbsp;&nbsp;&nbsp;&nbsp;
                {isMobile? '':'Coculture'}
            </div>:''}
            <div className='recorder'>            
                <div className='recorderTop space-between flex wrap center'>                
                       <div className='details'>
                            <h4 className='name'>{applicant.name}</h4>
                            <h4 className='role'>{applicant.role}</h4>
                            <h4 className='age'>{applicant.age}</h4>
                       </div> 
                        <div className='mic'>
                            <Dictaphone updateTranscript={updateTranscript} id={id} applicant={applicant}  />
                        </div>
                </div>

                <div className='question-sets wrap flex center space-between'>       
                    <div className='question'><h3>Question Ideas</h3>{question}</div>
                    <button className='width-120' onClick={this.changeQuestion}>Show Another</button>
                </div>
            </div>
            </>
        );
    }
}


const mapStateToProps = state => {
	return {
		auth: state.firebase.auth,
        applicant: state.applicant
	};
};

const mapDispatchToProps = dispatch => {
	return {
        getApplicant: payload => dispatch(getApplicant(payload)),
        updateTranscript: payload => dispatch(updateTranscript(payload)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Recorder);
