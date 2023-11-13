/* eslint-disable react/jsx-no-undef */
import { useState, useEffect } from 'react'
import './Home.css'
import { getOccCount, getSpeciesCount } from '../../services/apiClientService'

export default function Home() {
  const [occCount, setOccCount] = useState(null)
  const [speccsCount, setSpeccsCount] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const occCountResult = await getOccCount()
        console.log(occCountResult)
        const speccsCountResult = await getSpeciesCount()
        console.log(speccsCountResult)

        setOccCount(occCountResult.data)
        setSpeccsCount(speccsCountResult.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="homeContainer">
      <h1>Welcome Page(soon)</h1>
      <div className="welcomeContainer">
        <h1>
          Database currently featuring:
          <br />
          {occCount} external entries containing
          <br />
          {speccsCount} unique species.
        </h1>
        <div className="critterOfTheDayContainer">
          <h1>Critter of the Day</h1>
        </div>
      </div>
    </div>
  )
}
