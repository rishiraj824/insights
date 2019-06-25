const applicant = (state = [], action) => {
    switch (action.type) {
        case 'APPLICANT_FETCHED':			
            return action.payload;  
        default: 
            return state    
    }
}
export default applicant;