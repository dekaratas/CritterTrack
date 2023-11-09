import { apiServerAxios, apiGetServerAxios, apiDeleteServerAxios } from './axiosInstances'

export default async function addNewRecord(data) {
  try {
    const response = await apiServerAxios.post('', data)
    return response.data
  } catch (error) {
    console.error('There has been an issue with submitting your data: ', error)
  }
}

export async function getMyRecords() {
  try {
    const response = await apiGetServerAxios.get('')
    return response.data
  } catch (error) {
    console.error('There has been an issue retrieving your data: ', error)
  }
}

export async function deleteRecordById(id) {
  try {
    const response = await apiDeleteServerAxios.delete(`/${id}`)
    return response.data
  } catch (error) {
    console.error('There has been an issue deleting the record: ', error)
  }
}
