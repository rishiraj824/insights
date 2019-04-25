import authReducer from "./authReducer";
import onboarding from './onboarding';
import share from './share';
// import projectReducer from './projectReducer'
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
	auth: authReducer,
	// project: projectReducer,
	firestore: firestoreReducer,
	share,
	firebase: firebaseReducer,
	onboarding
});

export default rootReducer;
