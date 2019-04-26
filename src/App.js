import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Page from "./Layout/index";
import DressView from "./DressView/index";
import Navbar from "./Layout/Navbar";
import Sharer from "./Sharer";
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
		return(
			<Router>
			<Sidebar
				sidebar={<Navbar />}					
				open={this.state.sidebarOpen}
				onSetOpen={this.onSetSidebarOpen}
				styles={{ sidebar: { background: "white" } }}
				>
				<h2 className="logo">
				<svg onClick={() => this.onSetSidebarOpen(true)} width="100%" height="100%" viewBox="0 0 60 80" preserveAspectRatio="none">
					<path className="path" d="M3,20c0,0,12,0,27,0s27,0,27,0"></path>
					<line className="path" x1="3" y1="40" x2="57" y2="40"></line>
					<path className="path" d="M3,60c0,0,12,0,27,0s27,0,27,0"></path>
				</svg>
					<Link to="/" className="brand-logo">
						PrimeFit
					</Link>
					<p className="caption">Your way to a perfect fit.</p>
				</h2>     
			</Sidebar>
			<Route exact path="/" component={Page} />
			<Route exact path="/new" component={Sharer} />
			<Route path="/dress/:id" component={DressView} />
		</Router>
		);
	}
}

export default App;
