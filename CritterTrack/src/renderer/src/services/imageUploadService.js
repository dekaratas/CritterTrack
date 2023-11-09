import postImageAxios from './axiosInstances'

export default async function uploadImage(formData) {
  const response = await postImageAxios.post('', formData)
  return response.data
}
