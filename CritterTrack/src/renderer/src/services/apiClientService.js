import { apiServerAxios } from './axiosInstances'

export default async function addNewRecord(data) {
  try {
    const response = await apiServerAxios.post('', data)
    return response.data
  } catch (error) {
    console.error('There has been an issue with submitting your data: ', error)
  }
}
