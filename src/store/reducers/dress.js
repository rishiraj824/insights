const dress = (state = {}, action) => {
    switch (action.type) {
        case 'DRESS_FETCHED':
            return {
                ...action.payload
            }
        default: 
            return state    
    }
}
export default dress;