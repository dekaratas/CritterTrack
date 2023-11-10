/* eslint-disable react/jsx-no-undef */
// https://mof.obis.org/
// Temporary using Empty Welcome screen to get my database filled
import './Home.css'
import { getOccurrences } from '../../services/apiClientService'
import { useState } from 'react'

export default function Home() {
  const [responseData, setResponseData] = useState('')

  const handleButtonClick = () => {
    const delayInSeconds = 2
    let currentDate = new Date()

    setInterval(async () => {
      const startDate = currentDate.toISOString().split('T')[0]
      const endDate = currentDate.toISOString().split('T')[0]

      const query = `?startdate=${startDate}&enddate=${endDate}&size=5`

      const data = await getOccurrences(query)
      setResponseData(data)
      currentDate.setDate(currentDate.getDate() - 1)
    }, delayInSeconds * 1000)
  }
  return (
    <div className="homeContainer">
      <h1>
        Wheras this will become the welcome page at some point
        <br />
        Im using it to fill my db and move onto charts and graphs
      </h1>
      <button onClick={handleButtonClick}>Lets get this started!</button>
      <p>{responseData}</p>
    </div>
  )
}
