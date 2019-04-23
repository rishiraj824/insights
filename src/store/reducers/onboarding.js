
const initState = {
    questions: {},    
  }
  
  const onboarding = (state = initState, action) => {
    switch(action.type){
      case 'ON_RESPONSE_CHANGE':
        return {
          ...state,
          questions: {
            ...state.questions,
            [action.payload.id]: {
              ...state.questions[action.payload.id],
              ...action.payload
            }
          }
        }

      default:
        return state
    }
  };
  
  export default onboarding;