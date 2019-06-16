import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Page from "./Layout/index";
import Report from "./Report";

class App extends Component {
	render() {
		return (
			<Router>
				<Route exact path="/" component={Page} />
				<Route exact path="/applicant/:id" component={Report} />
			</Router>
		);
	}
}

export default App;
