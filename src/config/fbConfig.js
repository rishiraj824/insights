import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Replace this with your own config details
var config = {
	apiKey: "AIzaSyCeN7R32PZxs2gU24xi2NlLPCfLh_2Y6yk",
	authDomain: "prime-fit.firebaseapp.com",
	databaseURL: "https://prime-fit.firebaseio.com",
	projectId: "prime-fit",
	storageBucket: "prime-fit.appspot.com",
	messagingSenderId: "388794960795"
};
firebase.initializeApp(config);
firebase.firestore().settings({  });

export default firebase;
