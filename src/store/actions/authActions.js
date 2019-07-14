import config from '../../config/index';

const host = config.host;

export const signIn = credentials => {
	return ( dispatch, getState, {
		getFirebase
	} ) => {
		const firebase = getFirebase();
		firebase
			.auth()
			.signInWithPopup( new firebase.auth.GoogleAuthProvider() )
			.then( ( res ) => {
				console.log( res );
				dispatch(fetchUser(res.user.uid));
			} )
			.catch( err => {
				dispatch( {
					type: "LOGIN_ERROR",
					err
				} );
			} );
	};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
};

export const signOutAuthDialog = () => dispatch => {
	dispatch({
		type: 'TOGGLE_DIALOG'
	})
}

export const onInputChange = (payload) => dispatch => {
	dispatch({
		type: 'ON_INPUT_CHANGE',
		payload
	})
}

export const signUpWithEmailPassword = (email, password) => {
	return (dispatch, getState, {
		getFirebase
	}) => {
		const firebase = getFirebase();
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(res=>{ 
			dispatch({
				type: 'SIGNED_UP_SUCCESS'
			})
		})
		.catch(function(error) {
			
			dispatch( {
				type: "LOGIN_ERROR"
			} );
		});
	}
}

export const openLoginForm = () => dispatch => {
	dispatch({
		type: 'LOGIN_FORM'
	})
}

export const openSignUpForm = () => dispatch => {
	dispatch({
		type: 'SIGNUP_FORM'
	})
}

export const fetchUser = (id) => dispatch => {
	fetch( `${host}/getUser?userId=${id}` )
		.then( resp => {
			return resp.text()
		})
		.then( response => {
			console.log(response);
			if(typeof response === 'string') {
				try{
					response = JSON.parse(response);
				}catch(err){
					console.log("No response while fetching user data...")
				}
			}
			if (response === undefined || !response[ 'name' ] ) {
				console.log("Opening")
				dispatch( {
					type: "OPEN_ONBOARDING"
				} );
			}
			dispatch( {
				type: "LOGIN_SUCCESS"
			} );
		} )
}
export const signInWithEmailPassword = (email, password) => {
	return (dispatch, getState, {
		getFirebase
	}) => {
		const firebase = getFirebase();
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(res=>{			
			dispatch( {
				type: "LOGIN_SUCCESS"
			} );
		})
		.catch(function(error) {
					
			dispatch( {
				type: "LOGIN_ERROR"
			} );
		});
	}
}
export const signOut = () => {
	return ( dispatch, getState, {
		getFirebase
	} ) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signOut()
			.then( () => {
				dispatch( {
					type: "SIGNOUT_SUCCESS"
				} );
				window.location.reload();
			} );
	};
};
