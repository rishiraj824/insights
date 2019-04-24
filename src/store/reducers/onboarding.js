
const initState = {
    values: {
      height: {
          feet:'4',
          inches:'1'
      },
      weight: '120',
      cup:{
          size:'35',
          alpha: 'A'
      },
      shoulder: '2',
      waist: '2',
      hip: '2',
      bellyShape:'2',
      buttShape: '2'
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
      case 'OPEN_ONBOARDING':
        return {
          ...state,
          open: true
        }
      default:
        return state
    }
  };
  
  export default onboarding;