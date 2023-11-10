/* eslint-disable react/jsx-no-undef */
// https://mof.obis.org/
// Temporary using Empty Welcome screen to get my database filled
import './Home.css'
import { getOccurrences } from '../../services/apiClientService'

const delayInSeconds = 3
let currentDate = new Date()

setInterval(async () => {
  const startDate = currentDate.toISOString().split('T')[0]
  const endDate = currentDate.toISOString().split('T')[0]

  const query = `?startdate=${startDate}&enddate=${endDate}mof=true&size=100`

  const data = await getOccurrences(query)
  console.log(data)
  currentDate.setDate(currentDate.getDate() - 4)
}, delayInSeconds * 1000)

export default function Home() {
  return <div className="homeContainer"></div>
}
