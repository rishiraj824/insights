import React, { Component } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};
const options = {
  autoStart: false,
  continuous: false
}

const Dictaphone = ({
  transcript,
  resetTranscript,
  finalTranscript,
  listening,
  browserSupportsSpeechRecognition,
  startListening,
  stopListening
}) => {
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
      <>
      <button onClick={listening? stopListening: startListening } className='solid'>{listening? 'Stop':'Start'} Recording</button>
      <h5 className='name'>{transcript}</h5>
    </>
  );
};

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(options)(Dictaphone);