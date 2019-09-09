import React, { Component } from 'react';
import './Recorder.css';
import { getApplicant, updateTranscript } from './store/actions/applicants';
import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';
import questions from './questions';
import Dictaphone from './SpeechButton';
import { getNavbar } from './components/nav';
import { signOut, signOutAuthDialog } from './store/actions/authActions';

class Recorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question:
        'Tell me about a time when you were faced with a problem that had a number of possible solutions. What was the problem and how did you determine the course of action? What was the outcome of that choice?'
    };
  }
  componentDidMount() {
    const { getApplicant } = this.props;
    getApplicant(this.props.match.params.id);
  }
  changeQuestion = () => {
    this.setState({
      question: questions[Math.round(Math.random() * (questions.length - 0))].question
    });
  };
  render() {
    //const applicant = {"age":22,"experience":2,"name":"Benjamin Tod","role":"Assistant Manager"};
    const { auth, applicant, updateTranscript, signOut, signOutAuthDialog, showDialog } = this.props;
    const id = this.props.match.params.id;
    const { question } = this.state;
    return (
      <>
        {getNavbar(auth, signOut, signOutAuthDialog, showDialog)}

        <div className='recorder'>
          <div className='recorderTop space-between flex wrap center'>
            <div className='details'>
              <h4 className='name'>{applicant.name}</h4>
              <h4 className='role'>{applicant.role}</h4>
              <h4 className='age'>{applicant.age}</h4>
            </div>
            <div className='mic'>
              <Dictaphone updateTranscript={updateTranscript} id={id} applicant={applicant} />
            </div>
          </div>

          <div className='question-sets wrap flex center space-between'>
            <div className='question'>
              <h3>Question Ideas</h3>
              {question}
            </div>
            <button className='width-120' onClick={this.changeQuestion}>
              Show Another
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    applicant: state.applicant,
    openOnboarding: state.onboarding.open,
    showDialog: state.auth.showDialog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getApplicant: payload => dispatch(getApplicant(payload)),
    updateTranscript: payload => dispatch(updateTranscript(payload)),
    signOut: () => dispatch(signOut()),
    signOutAuthDialog: () => dispatch(signOutAuthDialog())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recorder);
