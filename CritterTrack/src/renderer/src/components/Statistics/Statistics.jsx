import { useState, useEffect } from 'react'
import './stats.css'
import { VictoryPie } from 'victory'

export default function Statistics() {
  const [countryData, setCountryData] = useState([])
  const [loading, setLoading] = useState(true) // New state to track loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true) // Set loading to true before fetching data

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
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    console.log(countryData)
  }, [countryData])

  return (
    <div className="statContainer">
      <h1>Customizable Stats and Graphs go here</h1>

      {loading ? (
        // Display a spinner or loading message while data is being fetched
        <div className="spinner-container">
          <p>Loading...</p>
        </div>
      ) : (
        // Display the VictoryPie component when data is loaded
        <VictoryPie
          colorScale={[
            '#a9daff',
            '#88ccff',
            '#68beff',
            '#3facff',
            '#0694ff',
            '#007ddc',
            '#0066b3',
            '#005392',
            '#004172',
            '#002e51',
            '#001728'
          ]}
          data={countryData}
        />
      )}
    </div>
  )
}
