
const initState = {
    open: false,
    values: {
        imagesURL: [],
        brand: '',
        name: "",
        item_code: '',
        color: '',
        size: '',
        type: "dress",
        subType: "",
        userId: "",
        rating: 5,
        review: '',
        likeability: 1
    }
}

const share = (state = initState, action) => {
    switch(action.type) {
        case 'ON_FORM_CHANGE':
            return {
                ...state,
                values:{    
                    ...state.values,
                    ...action.payload
                }
            }
        case 'IMAGE_UPLOADED': 
            return {
                ...state,
                values:{
                    ...state.values,
                    imagesURL: [
                        ...state.values.imagesURL,
                        action.payload
                    ]
                }
            }
        case 'OPEN_SHARER':
            return {
                ...state,
                open: true
            }
        default:
            return state;
    }
}

export default share;