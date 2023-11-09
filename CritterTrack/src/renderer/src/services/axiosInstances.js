/* eslint-disable prettier/prettier */
import axios from 'axios'

const postImageAxios = axios.create({
  baseURL: 'https://api.imgur.com/3/upload',
  timeout: 5000,
  headers: {
    Authorization: "Client-ID 546c25a59c58ad7",
    'Content-Type': 'multipart/form-data'
  }
})

export default postImageAxios
