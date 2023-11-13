import { postImageAxios, getImageAxios } from './axiosInstances.js'

export default async function uploadImage(formData) {
  const response = await postImageAxios.post('', formData)
  return response.data
}

export async function getImage(searchTerm) {
  const response = await getImageAxios.get(`${searchTerm}`)
  console.log('myImage', response.data)
  return response.data
}
