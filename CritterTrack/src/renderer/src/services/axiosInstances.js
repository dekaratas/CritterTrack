/* eslint-disable prettier/prettier */
import axios from 'axios'
import apiToken from '../../../../.env'
import clientId from '../../../../.env'

const postImageAxios = axios.create({
  baseURL: 'https://api.imgur.com/3/upload',
  timeout: 5000,
  headers: {
    'Authorization': apiToken,
    'Client-ID': clientId,
    'Content-Type': 'multipart/form-data'
  }
})

export default postImageAxios
