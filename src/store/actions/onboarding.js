import config from '../../config/index';
const host = config.host;

export const onChange = (payload) => dispatch => {
    dispatch({
        type: 'ON_RESPONSE_CHANGE',
        payload
    })
}

export const addUser = (body) => dispatch => {
    console.log(body);
    fetch( `${host}/addUser`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    } )
		.then( resp => {
			return resp.json()
		} )
		.then( response => {
            dispatch( {
                type: 'ADDED_USER'
            })
		} )
}