/* eslint-disable prettier/prettier */
import axios from 'axios'

// Axios Instace to upload to Imgur
export const postImageAxios = axios.create({
  baseURL: 'https://api.imgur.com/3/upload',
  timeout: 5000,
  headers: {
    Authorization: 'Client-ID 546c25a59c58ad7',
    'Content-Type': 'multipart/form-data'
  }
})

// Axios Instance to interact with my backend
export const apiServerAxios = axios.create({
  baseURL: 'http://localhost:3001/addsight',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})
