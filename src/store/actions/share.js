
import config from '../../config';

const imageBB = config.imageBB;
const key = imageBB.apiKey;

export const openSharer = () => dispatch => dispatch({
  type: 'OPEN_SHARER'
})

export const upload = (image) => dispatch => {
  fetch(config.imageBB.host,{ 
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    body: {
      image
    },
    query: {
      key
    }
  })
  .then(resp=>{
    dispatch({
      type: 'IMAGE_UPLOADED',
      payload: resp.url
    })
  })
}

export const onFormChange = (payload) => dispatch => dispatch({
  type: 'ON_FORM_CHANGE',
  payload
})
