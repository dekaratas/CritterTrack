import { apiServerAxios } from './axiosInstances'

export default async function addNewRecord(data) {
  const response = await apiServerAxios.post('', data)
  return response.data
}
