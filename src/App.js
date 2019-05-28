import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Page from "./Layout/index";
import Navbar from "./Layout/Navbar";
import Sidebar from "react-sidebar";
import { Link } from "react-router-dom";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sidebarOpen: false
		};
		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
	}

	onSetSidebarOpen(open) {
		this.setState({ sidebarOpen: open });
	}

	render() {
		return (
			<Router>
				<Sidebar
					sidebar={<Navbar />}
					open={this.state.sidebarOpen}
					onSetOpen={this.onSetSidebarOpen}
					overlayClassName={"overlay"}
					styles={{ sidebar: { background: "white" } }}>
					<div className="logo">
						<svg onClick={() => this.onSetSidebarOpen(true)} width="100%" height="100%" viewBox="0 0 60 80" preserveAspectRatio="none">
							<path className="path" d="M3,20c0,0,12,0,27,0s27,0,27,0" />
							<line className="path" x1="3" y1="40" x2="57" y2="40" />
							<path className="path" d="M3,60c0,0,12,0,27,0s27,0,27,0" />
						</svg>
						&nbsp;&nbsp;&nbsp;&nbsp;
						Coculture
					</div>
					<Route exact path="/" component={Page} />
				</Sidebar>
			</Router>
		);
	}
}

export default App;
