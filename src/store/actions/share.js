
import config from '../../config';

const imageBB = config.imageBB;
const key = imageBB.apiKey;

export const openSharer = () => dispatch => dispatch({
  type: 'OPEN_SHARER'
})

export const upload = (image) => dispatch => {
  console.log(image);
  var formData  = new FormData();
  formData.append('image', image);
  formData.append('type', 'file');
  console.log(formData);
  fetch(`https://api.imgur.com/3/image`,{ 
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Client-ID 7b79bed272c5319',
    },
    body: formData
  })
  .then(resp=>{
    console.log(resp);
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
