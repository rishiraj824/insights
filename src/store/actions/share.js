
import sanityClient from '@sanity/client'
import {createReadStream} from 'fs'
const client = sanityClient(config)
const filePath = '/Users/mike/images/bicycle.jpg'
client.assets.upload('image', createReadStream(filePath))
  .then(imageAsset => {
    console.log('got imageAsset', imageAsset)
  })

const upload = (file) => {

}
