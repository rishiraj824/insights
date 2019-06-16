const applicants = (state = [], action) => {
    switch (action.type) {
        case 'APPLICANTS_FETCHED':
			const data = Object.keys(action.payload).map(key=> ({...action.payload[key], id: key}))

            return data            
        default: 
            return state    
    }
}
export default applicants;