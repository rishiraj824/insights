import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Page from "./Layout/index";
import DressView from "./DressView/index";
import Navbar from "./Layout/Navbar";

class App extends Component {
	render() {
		return (
			<Router>
				<Navbar />
				<Route exact path="/" component={Page} />
				<Route path="/dress/:id" component={DressView} />
			</Router>
		);
	}
}

export default App;
