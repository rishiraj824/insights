import config from '../../config/index';
import { getApplicants } from './applicants';
const host = config.host;

export const onChange = (payload) => dispatch => {
    dispatch({
        type: 'ON_RESPONSE_CHANGE',
        payload
    })
}

export const addApplicant = (body) => dispatch => {
    fetch( `${host}/addApplicant`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    } )
		.then( resp => {
			return resp.text()
		} )
		.then( response => {
            dispatch( {
                type: 'ADDED_APPLICANT'
            }) 
            dispatch(getApplicants());
		} )
}