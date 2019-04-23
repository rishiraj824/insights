import { fetch as fetchPolyfill } from 'whatwg-fetch'
import config from '../../config/index';

const host = config.host;

export const signIn = credentials => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.then((res) => {
				console.log(res);
				fetchPolyfill(`${host}/getUser/userId=${res.userId}`)
				dispatch({ type: "LOGIN_SUCCESS" });
			})
			.catch(err => {
				dispatch({ type: "LOGIN_ERROR", err });
			});
	};
};

export const signOut = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signOut()
			.then(() => {
				dispatch({ type: "SIGNOUT_SUCCESS" });
			});
	};
};

export const signUp = newUser => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase();
		const firestore = getFirestore();

		firebase
			.auth()
			.signUpWithPopup(new firebase.auth.GoogleAuthProvider())
			.then(resp => {
				return firestore
					.collection("users")
					.doc(resp.user.uid)
					.set({
						firstName: newUser.firstName,
						lastName: newUser.lastName,
						initials: newUser.firstName[0] + newUser.lastName[0]
					});
			})
			.then(() => {
				dispatch({ type: "SIGNUP_SUCCESS" });
			})
			.catch(err => {
				dispatch({ type: "SIGNUP_ERROR", err });
			});
	};
};
