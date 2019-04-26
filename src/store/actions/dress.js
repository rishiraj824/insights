import config from '../../config/index';

const host = config.host;


export const getDress = (id) => dispatch => {
	fetch( `${host}/getDress?dressId=${id}` )
		.then( resp => {
			return resp.text()
		} )
		.then( response => {
			console.log(response);
			if(typeof response === 'string') {
				try{
					response = JSON.parse(response);
				}catch(err){
					console.log("No response while fetching user data...")
				}
			}
			dispatch( {
				type: "DRESS_FETCHED",
				payload: response
			} );
		} )
}