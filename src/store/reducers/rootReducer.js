import authReducer from "./authReducer";
import onboarding from "./onboarding";
import applicants from "./applicants";
import { applicant, applicant2 } from "./applicant";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
	auth: authReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer,
	onboarding,
	applicant,
	applicant2,
	applicants
});

export default rootReducer;
