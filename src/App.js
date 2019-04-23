import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Page from "./Layout/index";

class App extends Component {
	render() {
		return (
			<Router>
				<Page />
			</Router>
		);
	}
}

export default App;
