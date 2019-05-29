import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Page from "./Layout/index";
import Navbar from "./Layout/Navbar";
import Sidebar from "react-sidebar";

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
			<Router>{/* 
				<Sidebar
					sidebar={<Navbar />}
					open={this.state.sidebarOpen}
					onSetOpen={this.onSetSidebarOpen}
					overlayClassName={"overlay"}
			styles={{ sidebar: { background: "white" } }}>
		
				</Sidebar> */}
			<div className="logo">
				{/* <svg onClick={() => this.onSetSidebarOpen(true)} width="100%" height="100%" viewBox="0 0 60 80" preserveAspectRatio="none">
					<path className="path" d="M3,20c0,0,12,0,27,0s27,0,27,0" />
					<line className="path" x1="3" y1="40" x2="57" y2="40" />
					<path className="path" d="M3,60c0,0,12,0,27,0s27,0,27,0" />
			</svg> */}
			<svg xmlns="http://www.w3.org/2000/svg" width="26" height="31" viewBox="0 0 26 31">
						<g fill="none" fillRule="evenodd" stroke="#000" strokeWidth="1.5" transform="translate(1 1)">
							<path d="M0 28.458V9.253c.505-7.783 16.926-16.194 21.979 0 0 .162.625 2.884 1.874 8.167a.505.505 0 0 1-.492.621h-1.74a.505.505 0 0 0-.505.525c.062 1.659.055 2.488-.021 2.488-5.053-.878-6.19 4.269 0 4.269v3.135a.505.505 0 0 1-.506.505H.505A.505.505 0 0 1 0 28.458z"/>
							<ellipse cx="13.642" cy="12.554" rx="2.021" ry="2.009"/>
						</g>
					</svg>
				&nbsp;&nbsp;&nbsp;&nbsp;
				Coculture
			</div>
			<Route exact path="/" component={Page} />
			</Router>
		);
	}
}

export default App;
