export const onChange = (payload) => dispatch => {
    dispatch({
        type: 'ON_RESPONSE_CHANGE',
        payload
    })
}