import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Replace this with your own config details
const config = {
	apiKey: "AIzaSyBG99q06eG2Jxs7cmQTS5oRgBdJS5y45Wo",
	authDomain: "hr-insights-c28c5.firebaseapp.com",
	databaseURL: "https://hr-insights-c28c5.firebaseio.com",
	projectId: "hr-insights-c28c5",
	storageBucket: "hr-insights-c28c5.appspot.com",
	messagingSenderId: "66487554276",
	appId: "1:66487554276:web:fbdf37b072e4b949"
  };
firebase.initializeApp(config);
firebase.firestore().settings({  });

export default firebase;
