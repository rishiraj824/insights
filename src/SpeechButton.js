import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};
const options = {
  autoStart: false,
  continuous: true
};

const Dictaphone = ({
  transcript,
  resetTranscript,
  finalTranscript,
  listening,
  browserSupportsSpeechRecognition,
  startListening,
  stopListening,
  updateTranscript,
  id,
  applicant
}) => {
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <>
      <div className='flex'>
        <button onClick={listening ? stopListening : startListening} className='solid'>
          {listening ? 'Stop' : 'Start'}
        </button>
        {listening && <span className='signal' />}

        <a href='/' className={'linkbutton'}>
          Cancel
        </a>
      </div>
      <br></br>
      <h5 className='name'>{transcript}</h5>
      <br></br>
      {transcript.length > 0 && (
        <button
          onClick={() => {
            stopListening();
            updateTranscript({ id, ...applicant, transcript });
          }}
          className='solid'>
          Submit
        </button>
      )}
    </>
  );
};

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(options)(Dictaphone);
