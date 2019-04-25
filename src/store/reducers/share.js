
const initState = {
    vaules: {
        url: '',
        brand: '',
        item_code: '',
        color: '',
        size: '',
        rating: 5,
        review: ''
    }
}

const share = (state = initState, action) => {
    switch(action.type) {
        case 'ON_FORM_CHANGE':
            return {
                ...state,
                vaules:{
                    ...state.vaules,
                    ...action.payload
                }
            }
        default:
            return state;
    }
}

export default share;