
const initState = {
    values: {
        imagesURL: [],
        brand: 'H&M',
        name: "",
        itemCode: '',
        type: "dress",
        subType: "",
        userId: "",
        rating: 4,
        review: '',
        meta: {
            color: 'red',
            size: 'M'
        },
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
        default:
            return state;
    }
}

export default share;