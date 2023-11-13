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

export const getImageAxios = axios.create({
  baseURL: 'https://api.imgur.com/3/gallery/search?q=',
  timeout: 5000,
  headers: {
    Authorization: 'Client-ID 546c25a59c58ad7',
    'Content-Type': 'multipart/form-data'
  }
})

// Axios Instance to post entries to backend
export const apiServerAxios = axios.create({
  baseURL: 'http://localhost:3001/addsight',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Axios instance to GET sights from db
export const apiGetServerAxios = axios.create({
  baseURL: 'http://localhost:3001/sights',
  timeout: 5000
})

// Axios instance to DELETE sights from db
export const apiDeleteServerAxios = axios.create({
  baseURL: 'http://localhost:3001/sights',
  timeout: 5000
})

export const apiGetOccCount = axios.create({
  baseURL: 'http://localhost:3001/occs',
  timeout: 5000
})

export const apiGetSpeccsCount = axios.create({
  baseURL: 'http://localhost:3001/speccs',
  timeout: 5000
})

//! When using the wiki baseURL, it keeps adding a backwards slash to the query which messes it up
// Get a brief Wikipedia Description of any specific Species
export const getWikiText = axios.create({
  baseURL: '',
  timeout: 5000
})
