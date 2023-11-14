import { useState, useEffect } from 'react'
import './stats.css'
import { VictoryPie } from 'victory'

export default function Statistics() {
  const [countryData, setCountryData] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOption, setSelectedOption] = useState('button1')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch country names
        const response = await fetch('http://localhost:3001/countries')
        const data = await response.json()

        // Combine "United States" and "United States of America (the)"
        const combinedData = combineUnitedStates(data)

        // For each country, fetch the species count and update the state
        const dataWithSpeciesCount = await Promise.all(
          combinedData.map(async (country) => {
            const speciesResponse = await fetch(`http://localhost:3001/countCount/${country}`)
            const speciesCount = await speciesResponse.json()
            return { x: country, y: speciesCount }
          })
        )

        // Filter out duplicates after combining
        const uniqueData = filterDuplicates(dataWithSpeciesCount)

        // Sort the data by species count in descending order
        uniqueData.sort((a, b) => b.y - a.y)

        // Take the top 10 countries and group the rest as "Other"
        const top10Countries = uniqueData.slice(0, 10)
        const otherCountriesCount = uniqueData
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

  const handleOptionChange = (option) => {
    setSelectedOption(option)
    // You can add logic to update data based on the selected option here
  }

  return (
    <div className="statContainer">
      <h1>Stats and Graphs</h1>
      <div className="buttons">
        <p>
          <input
            type="radio"
            id="button1"
            name="options"
            value="button1"
            checked={selectedOption === 'button1'}
            onChange={() => handleOptionChange('button1')}
          />
          <label htmlFor="button1">Species distribution by Country</label>
          <input
            type="radio"
            id="button2"
            name="options"
            value="button2"
            checked={selectedOption === 'button2'}
            onChange={() => handleOptionChange('button2')}
          />
          <label htmlFor="button2">Button 2</label>
          <input
            type="radio"
            id="button3"
            name="options"
            value="button3"
            checked={selectedOption === 'button3'}
            onChange={() => handleOptionChange('button3')}
          />
          <label htmlFor="button3">Button 3</label>
          <input
            type="radio"
            id="button4"
            name="options"
            value="button4"
            checked={selectedOption === 'button4'}
            onChange={() => handleOptionChange('button4')}
          />
          <label htmlFor="button4">Button 4</label>
        </p>
      </div>
      {loading ? (
        <div className="spinner-container">
          <p>Loading...</p>
        </div>
      ) : (
        <VictoryPie
          events={[
            {
              target: 'data',
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      target: 'data',
                      mutation: ({ style }) => {
                        return style.fill === '#c43a31' ? null : { style: { fill: '#c43a31' } }
                      }
                    },
                    {
                      target: 'labels',
                      mutation: ({ style }) => {
                        return style.fill === '#c43a31' ? null : { style: { fill: '#c43a31' } }
                      }
                    }
                  ]
                }
              }
            }
          ]}
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
          height={300}
          data={countryData}
          style={{
            labels: {
              fontSize: 5,
              fill: 'white',
              fontWeight: 'bold',
              lineHeight: 1.5,
              wordWrap: 'break-word'
            }
          }}
        />
      )}
    </div>
  )
}

// Function to combine "United States" and "United States of America (the)"
const combineUnitedStates = (data) => {
  const unitedStatesIndex = data.findIndex((country) =>
    ['United States', 'United States of America (the)'].includes(country)
  )

  if (unitedStatesIndex !== -1) {
    const combinedData = [...data]
    combinedData[unitedStatesIndex] = 'United States' // Combine entries
    return combinedData
  }

  return data
}

// Function to filter out duplicate entries
const filterDuplicates = (data) => {
  const uniqueMap = new Map()
  data.forEach((entry) => {
    uniqueMap.set(entry.x, entry)
  })
  return Array.from(uniqueMap.values())
}
