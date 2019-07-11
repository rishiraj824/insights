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
			<button onClick={listening ? stopListening : startListening} className={listening ? "red solid":"solid"}>
				{listening?<i className='fa fa-stop'></i>:<i className='fa fa-microphone'></i>} {listening ? "End" : "Start"} Recording
			</button>
			<h5 className="name">{transcript}</h5>
			{transcript.length > 0 && (
				<button
					onClick={() => {
						updateTranscript({ id, ...applicant, transcript });
					}}
					className="solid">
					Submit
				</button>
			)}
		</>
	);
};

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(options)(Dictaphone);
