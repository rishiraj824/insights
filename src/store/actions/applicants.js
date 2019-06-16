import config from '../../config/index';

const host = config.host;


export const getApplicants = () => dispatch => {
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

export const searchApplicants = (value) => dispatch => { 
	

}

export const getApplicant = (id) => dispatch => {
	fetch(`${host}/getApplicant/${id}`)
	.then(response=>{		
		if(typeof response === 'string') {
			try{
				response = JSON.parse(response);
			}catch(err){
				console.log("No response while fetching user data...")
			}
		}
		dispatch( {
			type: "APPLICANT_FETCHED",
			payload: response
		} );
	})
}