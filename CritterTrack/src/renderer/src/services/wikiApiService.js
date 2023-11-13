import { getWikiText } from './axiosInstances'

// Update getOccCount function
export async function getSpecWikiText(name) {
  try {
    const response = await getWikiText.get(`${name}`)
    return response
  } catch (error) {
    console.log('Error retrieving Text: ', error)
  }
}
