import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase";
import firebaseui from "firebaseui";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Layout/Navbar";

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Navbar />
				</div>
			</Router>
		);
	}
}

export default App;
