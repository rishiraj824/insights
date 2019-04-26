
const initState = {
    values: {
      height: {
          feet:'4',
          inches:'1'
      },
      weight: '120',
      braSize:'35 C',
      bellyShape:'2',
      buttShape: '2',
      bodyShape: {
        shoulder: '2',
        waist: '2',
        hip: '2'
      },
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
      case 'OPEN_ONBOARDING':
        return {
          ...state,
          open: true
        }
      case 'CLOSE_ONBOARDING':
      return {
        ...state,
        open: false
      }
      default:
        return state
    }
  };
  
  export default onboarding;