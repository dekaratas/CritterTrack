import { useState, useEffect } from 'react'
import './stats.css'
import { VictoryPie } from 'victory'

export default function Statistics() {
  const [countryData, setCountryData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch country names
        const response = await fetch('http://localhost:3001/countries')
        const data = await response.json()

        // For each country, fetch the species count and update the state
        const dataWithSpeciesCount = await Promise.all(
          data.map(async (country) => {
            const speciesResponse = await fetch(`http://localhost:3001/countCount/${country}`)
            const speciesCount = await speciesResponse.json()
            return { x: country, y: speciesCount }
          })
        )

        // Sort the data by species count in descending order
        dataWithSpeciesCount.sort((a, b) => b.y - a.y)

        // Take the top 10 countries and group the rest as "Other"
        const top10Countries = dataWithSpeciesCount.slice(0, 10)
        const otherCountriesCount = dataWithSpeciesCount
          .slice(10)
          .reduce((sum, country) => sum + country.y, 0)

        // Add "Other" entry
        const updatedData = [...top10Countries, { x: 'Other', y: otherCountriesCount }]

        setCountryData(updatedData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  // Note: Avoid relying on console.log immediately after setCountryData due to asynchronous updates
  useEffect(() => {
    console.log(countryData)
  }, [countryData]) // Log the updated countryData whenever it changes

  return (
    <div className="statContainer">
      <h1>Customizable Stats and Graphs go here</h1>
      <VictoryPie data={countryData} />
    </div>
  )
}
