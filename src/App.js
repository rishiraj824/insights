import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Page from "./Layout/index";
import Report from "./Report";
import Recorder from "./Recorder";
export const Context = React.createContext({});

class App extends Component {
	render() {
		return (
			<Context.Provider>
				<Router>
					<Switch>
						<Route exact path="/" component={Page} />
						<Route exact path="/applicant/:id/report" component={Report} />
						<Route exact path="/applicant/:id/interview" component={Recorder} />
					</Switch>
				</Router>
			</Context.Provider>
		);
	}
}

export default App;
