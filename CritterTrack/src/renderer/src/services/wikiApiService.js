import { getWikiText } from './axiosInstances'

export async function getSpecWikiText(name) {
  try {
    const response = await getWikiText.get(`${name}`)
    return response
  } catch (error) {
    console.log('Error retrieving Text: ', error)
  }
}
