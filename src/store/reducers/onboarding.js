
const initState = {
    values: {
      name: '',
      experience:'',
      role: '',
      age: '20'
    },
    open: false
  }
  
  const onboarding = (state = initState, action) => {
    switch(action.type){
      case 'ON_RESPONSE_CHANGE':
        return {          
          ...state,
          values: {
            ...state.values,
            ...action.payload.values
          }
        }
      case 'OPEN_ADD_APPLICANT':
        return {
          ...state,
          open: true
        }
      case 'CLOSE_ADD_APPLICANT':
      return {
        ...state,
        open: false
      }
      default:
        return state
    }
  };
  
  export default onboarding;