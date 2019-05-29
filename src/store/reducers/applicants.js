const applicants = (state = {}, action) => {
    switch (action.type) {
        case 'APPLICANTS_FETCHED':
            return {
                ...action.payload
            }
        default: 
            return state    
    }
}
export default applicants;