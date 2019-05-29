import config from '../../config/index';

const host = config.host;


export const getApplicants = (id) => dispatch => {
	fetch( `${host}/getAllApplicants` )
		.then( resp => {
			return resp.text()
		} )
		.then( response => {
			if(typeof response === 'string') {
				try{
					response = JSON.parse(response);
				}catch(err){
					console.log("No response while fetching user data...")
				}
			}
			dispatch( {
				type: "APPLICANTS_FETCHED",
				payload: response
			} );
		} )
}