const initState = {
    authError: null,
    showDialog: false,
    signUpForm: false,
    email: '',
    password: ''
  }
  
  const authReducer = (state = initState, action) => {
    switch(action.type){
      case 'LOGIN_ERROR':
        return {
          ...state,
          authError: 'Login failed'
        }
  
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          authError: null
        }
      case 'SIGNOUT_SUCCESS':
        return state;
  
      case 'SIGNUP_SUCCESS':
        return {
          ...state,
          authError: null
        }
      case 'LOGIN_FORM': 
        return initState
      case 'SIGNUP_FORM':
      return {
        ...state,
        email:'',
        password:'',
        signUpForm: true,
      }
      case 'TOGGLE_DIALOG':
          return {
            ...state,
            showDialog: !state.showDialog
          }
      case 'ON_INPUT_CHANGE':
        return {
          ...state,
          ...action.payload
        }
      case 'SIGNUP_ERROR':
        console.log('signup error')
        return {
          ...state,
          authError: action.err.message
        }
  
      default:
        return state
    }
  };
  
  export default authReducer;