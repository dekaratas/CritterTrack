/* eslint-disable no-undef */
import {
  apiServerAxios,
  apiGetServerAxios,
  apiDeleteServerAxios,
  apiGetSpeccsCount,
  apiGetOccCount
} from './axiosInstances'

export default async function addNewRecord(data) {
  try {
    const response = await apiServerAxios.post('', data)
    return response.data
  } catch (error) {
    console.error('There has been an issue submitting your data: ', error)
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

// Update getSpeciesCount function
export async function getSpeciesCount() {
  try {
    const response = await apiGetSpeccsCount.get()
    return response
  } catch (error) {
    console.log('Error retrieving Species count: ', error)
  }
}

// Update getOccCount function
export async function getOccCount() {
  try {
    const response = await apiGetOccCount.get()
    return response
  } catch (error) {
    console.log('Error retrieving Entries: ', error)
  }
}
