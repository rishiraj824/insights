
import config from '../../config';
const host = config.host;


export const openSharer = () => dispatch => dispatch({
  type: 'OPEN_SHARER'
})

export const upload = (url) => dispatch => 
    dispatch({
      type: 'IMAGE_UPLOADED',
      payload: url
    }) 

export const onFormChange = (payload) => dispatch => dispatch({
  type: 'ON_FORM_CHANGE',
  payload
})

export const addDress = (body) => dispatch => {
  fetch( `${host}/addDress`, {
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
              type: 'ADDED_DRESS'
          })
          window.location.href = '/';
  } )
}