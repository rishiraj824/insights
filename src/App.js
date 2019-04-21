import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase";
import firebaseui from "firebaseui";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Layout/Navbar";

const Index = ({ signin }) => (
	<div>
		<button onClick={signin}> Google Sign in</button>
	</div>
);

function About() {
	return <h2>About</h2>;
}

function Users() {
	return <h2>Users</h2>;
}

class App extends Component {
	signInByGoogle() {
		var provider = new firebase.auth.GoogleAuthProvider();
		var config = {
			apiKey: "AIzaSyCeN7R32PZxs2gU24xi2NlLPCfLh_2Y6yk",
			authDomain: "prime-fit.firebaseapp.com",
			databaseURL: "https://prime-fit.firebaseio.com",
			projectId: "prime-fit",
			storageBucket: "prime-fit.appspot.com",
			messagingSenderId: "388794960795"
		};
		firebase.initializeApp(config);
		firebase
			.auth()
			.signInWithPopup(provider)
			.then(function(result) {
				// This gives you a Google Access Token. You can use it to access the Google API.
				var token = result.credential.accessToken;
				// The signed-in user info.
				var user = result.user;
				console.log(user);
				// ...
			})
			.catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				// ...
			});
	}

	render() {
		return (
			<Router>
				<div>
					<Navbar />
					<Route path="/" exact component={Index.bind(undefined, { signin: this.signInByGoogle })} />
					<Route path="/about/" component={About} />
					<Route path="/users/" component={Users} />
				</div>
			</Router>
		);
	}
}

export default App;
